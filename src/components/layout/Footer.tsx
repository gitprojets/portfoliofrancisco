import { ArrowUp } from "lucide-react";
import SocialLinks from "@/components/shared/SocialLinks";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 border-t border-border">
      <div className="container">
        {/* Back to Top */}
        <div className="flex justify-center mb-10">
          <button
            onClick={scrollToTop}
            className="group flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <div className="p-3 rounded-full border border-border group-hover:border-foreground/20 transition-colors">
              <ArrowUp className="w-4 h-4" />
            </div>
            <span className="text-xs tracking-widest uppercase">Voltar ao topo</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <span className="font-semibold text-xl tracking-tight">
              FD<span className="text-muted-foreground">.</span>
            </span>
            <p className="text-sm text-muted-foreground mt-2">
              © {currentYear} Francisco Douglas
            </p>
          </div>

          {/* Social Links */}
          <SocialLinks variant="footer" />

          {/* Made With */}
          <p className="text-sm text-muted-foreground">
            Desenvolvido com dedicação
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
