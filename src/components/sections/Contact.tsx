import { Mail, MapPin, Send, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Reveal } from "@/hooks/useAnimations";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import SectionHeader from "@/components/shared/SectionHeader";
import { socialLinks } from "@/config/social-links";
import { usePortfolioContent } from "@/hooks/usePortfolioContent";

interface ContactContent {
  sectionTitle: string;
  sectionHighlight: string;
  sectionDescription: string;
  opportunityTitle: string;
  opportunityDescription: string;
  opportunityTags: string[];
  location: string;
}

const defaultContent: ContactContent = {
  sectionTitle: "Vamos",
  sectionHighlight: "Conversar?",
  sectionDescription: "Estou sempre aberto a novas oportunidades, projetos desafiadores e conversas sobre tecnologia.",
  opportunityTitle: "Aberto para Oportunidades",
  opportunityDescription: "Buscando posições em Front-End, Full Stack ou projetos freelance.",
  opportunityTags: ["Front-End", "Full Stack", "Freelance"],
  location: "Brasil"
};

const Contact = () => {
  const { toast } = useToast();
  const { data: content } = usePortfolioContent<ContactContent>('contact', defaultContent);
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const result = contactFormSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContactFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Erro de validação",
        description: "Por favor, corrija os campos destacados.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) throw error;

      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
      
      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo contato. Responderei em breve!",
      });

      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error: unknown) {
      console.error("Error sending message:", error);
      toast({
        title: "Erro ao enviar",
        description: (error as Error).message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const email = socialLinks.find(s => s.label === "Email")?.href.replace("mailto:", "") || "";

  return (
    <section id="contato" className="section-padding relative">
      <div className="container">
        <SectionHeader
          badge="Contato"
          title={content.sectionTitle || defaultContent.sectionTitle}
          highlight={content.sectionHighlight || defaultContent.sectionHighlight}
          description={content.sectionDescription || defaultContent.sectionDescription}
        />

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <Reveal>
              <div className="p-8 rounded-2xl bg-card border border-border">
                <h3 className="font-semibold text-xl mb-6">Informações</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
                    <div className="w-10 h-10 rounded-lg bg-foreground text-background flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground block">E-mail</span>
                      <a href={`mailto:${email}`} className="text-sm font-medium hover:underline">
                        {email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
                    <div className="w-10 h-10 rounded-lg bg-foreground text-background flex items-center justify-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground block">Localização</span>
                      <span className="text-sm font-medium">{content.location || defaultContent.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Opportunity Card */}
            <Reveal delay={200}>
              <div className="p-8 rounded-2xl bg-foreground text-background">
                <h4 className="font-semibold text-lg mb-3">
                  {content.opportunityTitle || defaultContent.opportunityTitle}
                </h4>
                <p className="text-sm opacity-80 mb-6">
                  {content.opportunityDescription || defaultContent.opportunityDescription}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(content.opportunityTags || defaultContent.opportunityTags).map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs font-medium bg-background/20 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Contact Form */}
          <Reveal delay={100}>
            <div className="p-8 rounded-2xl bg-card border border-border">
              <h3 className="font-semibold text-xl mb-6">Envie uma Mensagem</h3>
              
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h4 className="font-semibold text-xl mb-2">Mensagem Enviada!</h4>
                  <p className="text-muted-foreground text-sm">Responderei em breve.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium mb-2 block">
                      Nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      className={`w-full px-4 py-3 rounded-lg bg-secondary border ${errors.name ? 'border-destructive' : 'border-transparent'} focus:border-foreground focus:outline-none transition-colors placeholder:text-muted-foreground`}
                      placeholder="Seu nome"
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive mt-1">{errors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="text-sm font-medium mb-2 block">
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      className={`w-full px-4 py-3 rounded-lg bg-secondary border ${errors.email ? 'border-destructive' : 'border-transparent'} focus:border-foreground focus:outline-none transition-colors placeholder:text-muted-foreground`}
                      placeholder="seu@email.com"
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="text-sm font-medium mb-2 block">
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      rows={4}
                      className={`w-full px-4 py-3 rounded-lg bg-secondary border ${errors.message ? 'border-destructive' : 'border-transparent'} focus:border-foreground focus:outline-none transition-colors resize-none placeholder:text-muted-foreground`}
                      placeholder="Como posso ajudar?"
                      disabled={isSubmitting}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive mt-1">{errors.message}</p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
