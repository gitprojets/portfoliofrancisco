import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles } from "lucide-react";
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
  headline: ["Transformando", "ideias em", "experiências digitais"],
  subtitle: "Desenvolvedor Front-End & Full Stack | Líder em Educação | Unindo tecnologia, gestão e propósito para criar impacto real.",
  ctaButtons: { primary: "Ver Projetos", secondary: "Entrar em Contato" }
};

const Hero = () => {
  const { data: content } = usePortfolioContent<HeroContent>('hero', defaultContent);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Multiple Background Layers */}
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-[10%] w-2 h-2 bg-primary rounded-full animate-float opacity-60" />
      <div className="absolute top-32 right-[15%] w-3 h-3 bg-primary/50 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-[20%] w-2 h-2 bg-primary/70 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-[10%] w-1.5 h-1.5 bg-primary/40 rounded-full animate-float" style={{ animationDelay: '3s' }} />
      
      {/* Decorative Lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-40 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

      <div className="container relative z-10 px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-premium mb-10 animate-fade-up">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm text-foreground/80 font-medium">{content.badge}</span>
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>

          {/* Main Headline with Premium Typography */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-8xl font-bold leading-[0.95] mb-8 animate-fade-up stagger-1">
            <span className="block">{content.headline[0] || 'Transformando'}</span>
            <span className="block text-gradient-animated mt-2">{content.headline[1] || 'ideias em'}</span>
            <span className="block mt-2">{content.headline[2] || 'experiências digitais'}</span>
          </h1>

          {/* Subtitle with Refined Typography */}
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-fade-up stagger-2 leading-relaxed">
            {content.subtitle}
          </p>

          {/* CTA Buttons with Premium Styling */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16 animate-fade-up stagger-3">
            <Button 
              variant="hero" 
              size="xl"
              onClick={() => scrollToSection("projetos")}
              className="group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                {content.ctaButtons.primary}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </Button>
            <Button 
              variant="heroOutline" 
              size="xl"
              onClick={() => scrollToSection("contato")}
            >
              {content.ctaButtons.secondary}
            </Button>
          </div>

          {/* Social Links with Premium Hover Effects */}
          <div className="flex items-center justify-center animate-fade-up stagger-4">
            <SocialLinks variant="hero" />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <button 
            onClick={() => scrollToSection("sobre")}
            className="group flex flex-col items-center gap-2 hoverable"
            aria-label="Scroll para baixo"
          >
            <span className="text-xs text-muted-foreground tracking-wider uppercase group-hover:text-primary transition-colors">Scroll</span>
            <div className="p-2 rounded-full glass-premium group-hover:bg-primary/10 transition-colors animate-bounce">
              <ArrowDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
