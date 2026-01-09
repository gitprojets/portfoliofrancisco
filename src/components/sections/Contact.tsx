import { Mail, MapPin, Send, ArrowUpRight, Sparkles, Loader2, CheckCircle2 } from "lucide-react";
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
  sectionDescription: "Estou sempre aberto a novas oportunidades, projetos desafiadores e conversas sobre tecnologia, educação e inovação.",
  opportunityTitle: "Aberto para Oportunidades",
  opportunityDescription: "Buscando posições em Front-End, Full Stack, EdTech ou projetos freelance que combinem tecnologia e impacto social.",
  opportunityTags: ["Front-End", "Full Stack", "EdTech", "Freelance"],
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

  const contactInfo = [
    {
      icon: Mail,
      label: "E-mail",
      value: socialLinks.find(s => s.label === "Email")?.href.replace("mailto:", "") || "",
      href: socialLinks.find(s => s.label === "Email")?.href
    },
    {
      icon: socialLinks[0].icon,
      label: "LinkedIn",
      value: "linkedin.com/in/franciscodouglas",
      href: socialLinks[0].href
    },
    {
      icon: socialLinks[1].icon,
      label: "GitHub",
      value: "github.com/franciscodouglas",
      href: socialLinks[1].href
    },
    {
      icon: MapPin,
      label: "Localização",
      value: content.location || defaultContent.location,
      href: null
    }
  ];

  return (
    <section id="contato" className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-radial from-primary/5 via-transparent to-transparent -translate-y-1/2" />
      
      <div className="container relative">
        <SectionHeader
          badge="Contato"
          title={content.sectionTitle || defaultContent.sectionTitle}
          highlight={content.sectionHighlight || defaultContent.sectionHighlight}
          description={content.sectionDescription || defaultContent.sectionDescription}
        />

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <Reveal>
              <div className="p-8 md:p-10 rounded-3xl glass-premium">
                <h3 className="font-display font-semibold text-2xl mb-8">
                  Informações de Contato
                </h3>
                
                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <Reveal key={item.label} delay={index * 100}>
                      <div className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-secondary/50 transition-all duration-300 hoverable">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                          <item.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">{item.label}</span>
                          {item.href ? (
                            <a 
                              href={item.href}
                              target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                              rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                              className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1 group/link"
                            >
                              {item.value}
                              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-all duration-300" />
                            </a>
                          ) : (
                            <span className="text-sm font-medium">{item.value}</span>
                          )}
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* CTA Card */}
            <Reveal delay={400}>
              <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-primary/20 to-transparent" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h4 className="font-display font-semibold text-xl">
                      {content.opportunityTitle || defaultContent.opportunityTitle}
                    </h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    {content.opportunityDescription || defaultContent.opportunityDescription}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(content.opportunityTags || defaultContent.opportunityTags).map((tag) => (
                      <span key={tag} className="px-4 py-2 text-xs font-medium bg-primary/20 text-primary rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Contact Form */}
          <Reveal delay={200}>
            <div className="p-8 md:p-10 rounded-3xl glass-premium border-gradient">
              <h3 className="font-display font-semibold text-2xl mb-8">
                Envie uma Mensagem
              </h3>
              
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6 animate-scale-in">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h4 className="font-display font-semibold text-2xl mb-2">Mensagem Enviada!</h4>
                  <p className="text-muted-foreground">Obrigado pelo contato. Responderei em breve!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium mb-3 block">
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
                      className={`w-full px-5 py-4 rounded-2xl bg-secondary/50 border ${errors.name ? 'border-destructive' : 'border-border'} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/50 hoverable`}
                      placeholder="Seu nome"
                      disabled={isSubmitting}
                      maxLength={100}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive mt-2">{errors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="text-sm font-medium mb-3 block">
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
                      className={`w-full px-5 py-4 rounded-2xl bg-secondary/50 border ${errors.email ? 'border-destructive' : 'border-border'} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/50 hoverable`}
                      placeholder="seu@email.com"
                      disabled={isSubmitting}
                      maxLength={255}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-2">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="text-sm font-medium mb-3 block">
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      rows={5}
                      className={`w-full px-5 py-4 rounded-2xl bg-secondary/50 border ${errors.message ? 'border-destructive' : 'border-border'} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none placeholder:text-muted-foreground/50 hoverable`}
                      placeholder="Como posso ajudar?"
                      disabled={isSubmitting}
                      maxLength={1000}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive mt-2">{errors.message}</p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="xl" 
                    className="w-full group hoverable"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
