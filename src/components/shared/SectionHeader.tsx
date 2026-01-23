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
      <div className="text-center mb-16 md:mb-20">
        <span className="inline-block text-sm font-medium text-muted-foreground tracking-wider uppercase mb-4">
          {badge}
        </span>
        <h2 className="text-display-sm md:text-display-md font-bold tracking-tight">
          {title} <span className="text-muted-foreground">{highlight}</span>
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
