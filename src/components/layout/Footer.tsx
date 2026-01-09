import { Heart, ArrowUp } from "lucide-react";
import SocialLinks from "@/components/shared/SocialLinks";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-16 border-t border-border overflow-hidden">
      {/* Background Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-radial from-primary/5 via-transparent to-transparent" />

      <div className="container relative">
        {/* Back to Top */}
        <div className="flex justify-center mb-12">
          <button
            onClick={scrollToTop}
            className="group flex flex-col items-center gap-2 hoverable"
          >
            <div className="p-3 rounded-full glass-premium group-hover:bg-primary/10 transition-colors">
              <ArrowUp className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <span className="text-xs text-muted-foreground uppercase tracking-wider group-hover:text-primary transition-colors">
              Voltar ao topo
            </span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <span className="font-display font-bold text-2xl">
              F<span className="text-primary">D</span>
            </span>
            <p className="text-sm text-muted-foreground mt-2">
              © {currentYear} Francisco Douglas. Todos os direitos reservados.
            </p>
          </div>

          {/* Social Links */}
          <SocialLinks variant="footer" />

          {/* Made With */}
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground flex items-center gap-2 justify-center md:justify-end">
              Feito com <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" /> e muito código
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
