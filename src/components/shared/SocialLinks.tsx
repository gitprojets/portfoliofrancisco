import { useSocialLinks, getIconComponent } from "@/hooks/useSocialLinks";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  variant?: "hero" | "footer" | "default";
  className?: string;
}

const SocialLinks = ({ variant = "default", className }: SocialLinksProps) => {
  const { data: links = [], isLoading } = useSocialLinks();
  
  const variants = {
    hero: "flex items-center gap-1",
    footer: "flex items-center gap-1",
    default: "flex items-center gap-1",
  };

  const buttonVariants = {
    hero: "p-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors",
    footer: "p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors",
    default: "p-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors",
  };

  const iconVariants = {
    hero: "w-5 h-5",
    footer: "w-4 h-4",
    default: "w-5 h-5",
  };

  if (isLoading) {
    return (
      <div className={cn(variants[variant], className)}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-10 h-10 rounded-lg bg-secondary animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className={cn(variants[variant], className)}>
      {links.map(({ icon, href, label }) => {
        const Icon = getIconComponent(icon);
        return (
          <a 
            key={label}
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            className={buttonVariants[variant]}
            aria-label={label}
          >
            <Icon className={iconVariants[variant]} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
