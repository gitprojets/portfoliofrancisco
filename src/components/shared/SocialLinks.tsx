import { useSocialLinks, getIconComponent } from "@/hooks/useSocialLinks";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  variant?: "hero" | "footer" | "default";
  className?: string;
}

const SocialLinks = ({ variant = "default", className }: SocialLinksProps) => {
  const { data: links = [], isLoading } = useSocialLinks();
  
  const baseStyles = "group relative transition-all duration-300 hoverable";
  
  const variants = {
    hero: "p-4 rounded-2xl glass-premium hover:bg-primary/10 hover:scale-110",
    footer: "w-11 h-11 rounded-xl glass-premium flex items-center justify-center hover:bg-primary/10 hover:scale-110",
    default: "p-3 rounded-xl hover:bg-primary/10",
  };

  const iconVariants = {
    hero: "w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300",
    footer: "w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors",
    default: "w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors",
  };

  if (isLoading) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        {[1, 2, 3].map((i) => (
          <div key={i} className={cn(variants[variant], "animate-pulse bg-muted")} />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {links.map(({ icon, href, label }) => {
        const Icon = getIconComponent(icon);
        return (
          <a 
            key={label}
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            className={cn(baseStyles, variants[variant])}
            aria-label={label}
          >
            <Icon className={iconVariants[variant]} />
            {variant === "hero" && (
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {label}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
