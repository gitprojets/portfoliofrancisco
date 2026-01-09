import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormRequest {
  name: string;
  email: string;
  message: string;
}

// Sanitize HTML to prevent XSS attacks
const escapeHtml = (text: string): string => {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  return text.replace(/[&<>"'/]/g, (char) => htmlEscapes[char]);
};

// Robust email validation regex (RFC 5322 compliant)
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
  return emailRegex.test(email);
};

// Validate input lengths
const validateInput = (name: string, email: string, message: string): string | null => {
  if (!name || !email || !message) {
    return "Todos os campos são obrigatórios";
  }
  
  if (name.length > 100) {
    return "Nome deve ter no máximo 100 caracteres";
  }
  
  if (email.length > 255) {
    return "Email deve ter no máximo 255 caracteres";
  }
  
  if (message.length > 1000) {
    return "Mensagem deve ter no máximo 1000 caracteres";
  }
  
  if (!isValidEmail(email)) {
    return "Email inválido";
  }
  
  return null;
};

const handler = async (req: Request): Promise<Response> => {
  console.log("Send contact email function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message }: ContactFormRequest = await req.json();

    console.log("Processing contact form submission from:", email);

    // Validate input
    const validationError = validateInput(name, email, message);
    if (validationError) {
      console.error("Validation error:", validationError);
      return new Response(
        JSON.stringify({ error: validationError }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Sanitize inputs for HTML
    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeMessage = escapeHtml(message.trim());

    // Send notification email to site owner
    const notificationRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Portfólio <onboarding@resend.dev>",
        to: ["contato@franciscodouglas.dev"],
        subject: `Nova mensagem de contato: ${safeName}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0a0a0f; color: #f5f5f5; padding: 40px; }
              .container { max-width: 600px; margin: 0 auto; background: linear-gradient(145deg, rgba(20, 20, 30, 0.9), rgba(10, 10, 15, 0.8)); border-radius: 16px; padding: 40px; border: 1px solid rgba(255, 255, 255, 0.1); }
              h1 { color: #f5a623; margin-bottom: 24px; font-size: 24px; }
              .field { margin-bottom: 20px; }
              .label { color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
              .value { color: #f5f5f5; font-size: 16px; line-height: 1.6; }
              .message-box { background: rgba(245, 166, 35, 0.1); border-left: 3px solid #f5a623; padding: 16px; border-radius: 8px; margin-top: 24px; }
              .footer { margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.1); color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>✨ Nova Mensagem de Contato</h1>
              
              <div class="field">
                <div class="label">Nome</div>
                <div class="value">${safeName}</div>
              </div>
              
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${safeEmail}" style="color: #f5a623;">${safeEmail}</a></div>
              </div>
              
              <div class="message-box">
                <div class="label">Mensagem</div>
                <div class="value">${safeMessage}</div>
              </div>
              
              <div class="footer">
                Enviado através do formulário de contato do portfólio
              </div>
            </div>
          </body>
          </html>
        `,
      }),
    });

    const notificationData = await notificationRes.json();
    console.log("Notification email response:", notificationData);

    if (!notificationRes.ok) {
      throw new Error(notificationData.message || "Erro ao enviar email");
    }

    // Send confirmation email to the sender
    const confirmationRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Francisco Douglas <onboarding@resend.dev>",
        to: [email.trim()],
        subject: "Mensagem recebida! ✨",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0a0a0f; color: #f5f5f5; padding: 40px; }
              .container { max-width: 600px; margin: 0 auto; background: linear-gradient(145deg, rgba(20, 20, 30, 0.9), rgba(10, 10, 15, 0.8)); border-radius: 16px; padding: 40px; border: 1px solid rgba(255, 255, 255, 0.1); }
              h1 { color: #f5a623; margin-bottom: 16px; font-size: 28px; }
              p { color: #ccc; line-height: 1.8; margin-bottom: 16px; }
              .highlight { color: #f5a623; font-weight: 600; }
              .signature { margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.1); }
              .name { font-size: 18px; font-weight: 600; color: #f5f5f5; }
              .title { color: #888; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Olá, ${safeName}! 👋</h1>
              
              <p>Obrigado por entrar em contato! Recebi sua mensagem e estou muito feliz pelo seu interesse.</p>
              
              <p>Vou analisar sua mensagem com atenção e retornarei o mais breve possível — geralmente em até <span class="highlight">24 horas úteis</span>.</p>
              
              <p>Enquanto isso, fique à vontade para explorar meus projetos ou conectar-se comigo nas redes sociais.</p>
              
              <div class="signature">
                <div class="name">Francisco Douglas</div>
                <div class="title">Desenvolvedor Front-End & Full Stack</div>
              </div>
            </div>
          </body>
          </html>
        `,
      }),
    });

    const confirmationData = await confirmationRes.json();
    console.log("Confirmation email response:", confirmationData);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email enviado com sucesso!" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Erro ao enviar email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
