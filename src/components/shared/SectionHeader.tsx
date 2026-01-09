import { Reveal } from "@/hooks/useAnimations";

interface SectionHeaderProps {
  badge: string;
  title: string;
  highlight: string;
  description?: string;
}

const SectionHeader = ({ badge, title, highlight, description }: SectionHeaderProps) => {
  return (
    <Reveal>
      <div className="text-center mb-20">
        <span className="inline-flex items-center gap-2 text-primary font-display font-medium text-sm tracking-wider uppercase mb-6">
          <span className="w-12 h-px bg-primary" />
          {badge}
          <span className="w-12 h-px bg-primary" />
        </span>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
          {title} <span className="text-gradient">{highlight}</span>
        </h2>
        {description && (
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
};

export default SectionHeader;
