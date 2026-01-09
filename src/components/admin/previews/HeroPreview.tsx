import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface HeroContent {
  badge: string;
  headline: string[];
  subtitle: string;
  ctaButtons: { primary: string; secondary: string };
}

interface HeroPreviewProps {
  content: HeroContent;
}

const HeroPreview = ({ content }: HeroPreviewProps) => {
  return (
    <div className="relative min-h-[400px] flex items-center justify-center overflow-hidden bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px]" />
      
      <div className="relative z-10 px-6 py-12 text-center w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium mb-6">
          <Sparkles className="w-3 h-3 text-primary" />
          <span className="text-xs text-foreground/80 font-medium">{content.badge}</span>
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
        </div>

        {/* Headline */}
        <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4">
          <span className="block">{content.headline[0] || 'Transformando'}</span>
          <span className="block text-gradient mt-1">{content.headline[1] || 'ideias em'}</span>
          <span className="block mt-1">{content.headline[2] || 'experiências digitais'}</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto mb-6 leading-relaxed">
          {content.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button variant="hero" size="lg" className="pointer-events-none">
            {content.ctaButtons.primary}
            <span className="ml-2">→</span>
          </Button>
          <Button variant="heroOutline" size="lg" className="pointer-events-none">
            {content.ctaButtons.secondary}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroPreview;
