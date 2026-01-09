import { Mail, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactContent {
  sectionTitle: string;
  sectionHighlight: string;
  sectionDescription: string;
  opportunityTitle: string;
  opportunityDescription: string;
  opportunityTags: string[];
  location: string;
}

interface ContactPreviewProps {
  content: ContactContent;
}

const ContactPreview = ({ content }: ContactPreviewProps) => {
  return (
    <div className="bg-background p-6 min-h-[400px]">
      {/* Header */}
      <div className="text-center mb-6">
        <span className="inline-block px-4 py-1.5 rounded-full glass-premium text-xs mb-2">
          Contato
        </span>
        <h2 className="text-xl font-display font-bold">
          {content.sectionTitle} <span className="text-gradient">{content.sectionHighlight}</span>
        </h2>
        <p className="text-xs text-muted-foreground mt-2 max-w-md mx-auto">
          {content.sectionDescription}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Contact Info */}
        <div className="space-y-3">
          <div className="p-4 rounded-xl glass-premium">
            <h3 className="font-semibold text-sm mb-3">Informações de Contato</h3>
            
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase">E-mail</span>
                  <p className="text-xs">contato@exemplo.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase">Localização</span>
                  <p className="text-xs">{content.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Opportunity Card */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <h4 className="font-semibold text-sm">{content.opportunityTitle}</h4>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              {content.opportunityDescription}
            </p>
            <div className="flex flex-wrap gap-1">
              {content.opportunityTags.map((tag) => (
                <span key={tag} className="px-2 py-1 text-[10px] font-medium bg-primary/20 text-primary rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Form Preview */}
        <div className="p-4 rounded-xl glass-premium">
          <h3 className="font-semibold text-sm mb-3">Envie uma Mensagem</h3>
          
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium mb-1 block">Nome</label>
              <div className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-xs text-muted-foreground">
                Seu nome
              </div>
            </div>
            
            <div>
              <label className="text-xs font-medium mb-1 block">E-mail</label>
              <div className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-xs text-muted-foreground">
                seu@email.com
              </div>
            </div>
            
            <div>
              <label className="text-xs font-medium mb-1 block">Mensagem</label>
              <div className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-xs text-muted-foreground h-16">
                Como posso ajudar?
              </div>
            </div>
            
            <Button variant="hero" size="sm" className="w-full pointer-events-none text-xs">
              Enviar Mensagem
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPreview;
