import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight } from "lucide-react";
import SocialLinks from "@/components/shared/SocialLinks";
import { usePortfolioContent } from "@/hooks/usePortfolioContent";

interface HeroContent {
  badge: string;
  headline: string[];
  subtitle: string;
  ctaButtons: { primary: string; secondary: string };
}

const defaultContent: HeroContent = {
  badge: "Disponível para novos projetos",
  headline: ["Desenvolvedor", "Front-End &", "Full Stack"],
  subtitle: "Criando experiências digitais excepcionais através de código limpo, design intuitivo e soluções que fazem a diferença.",
  ctaButtons: { primary: "Ver Projetos", secondary: "Entrar em Contato" }
};

const Hero = () => {
  const { data: content } = usePortfolioContent<HeroContent>('hero', defaultContent);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Minimal Background */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.03]" />
      
      <div className="container relative z-10 px-6 pt-20">
        <div className="max-w-4xl mx-auto">
          {/* Status Badge */}
          <div className="flex items-center gap-3 mb-8 animate-fade-up">
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              {content.badge}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-display-lg md:text-display-xl font-bold tracking-tight mb-8 animate-fade-up stagger-1">
            <span className="block text-foreground">{content.headline[0] || 'Desenvolvedor'}</span>
            <span className="block text-muted-foreground">{content.headline[1] || 'Front-End &'}</span>
            <span className="block text-foreground">{content.headline[2] || 'Full Stack'}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 animate-fade-up stagger-2 leading-relaxed">
            {content.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-16 animate-fade-up stagger-3">
            <Button 
              size="lg"
              onClick={() => scrollToSection("projetos")}
              className="group"
            >
              {content.ctaButtons.primary}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => scrollToSection("contato")}
            >
              {content.ctaButtons.secondary}
            </Button>
          </div>

          {/* Social Links */}
          <div className="animate-fade-up stagger-4">
            <SocialLinks variant="hero" />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <button 
            onClick={() => scrollToSection("sobre")}
            className="group flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Scroll para baixo"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
