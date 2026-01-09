import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Linkedin, Github, Mail, Twitter, Instagram, Youtube, Facebook, type LucideIcon } from "lucide-react";

export interface SocialLink {
  icon: string;
  href: string;
  label: string;
}

const iconMap: Record<string, LucideIcon> = {
  Linkedin,
  Github,
  Mail,
  Twitter,
  Instagram,
  Youtube,
  Facebook,
};

const defaultLinks: SocialLink[] = [
  { icon: "Linkedin", href: "https://linkedin.com/in/franciscodouglas", label: "LinkedIn" },
  { icon: "Github", href: "https://github.com/franciscodouglas", label: "GitHub" },
  { icon: "Mail", href: "mailto:contato@franciscodouglas.dev", label: "Email" },
];

export const useSocialLinks = () => {
  return useQuery({
    queryKey: ["portfolio-content", "social-links"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_content")
        .select("content")
        .eq("section_key", "social-links")
        .maybeSingle();

      if (error) throw error;
      
      if (data?.content) {
        const content = data.content as unknown as { links: SocialLink[] };
        return content.links || defaultLinks;
      }
      
      return defaultLinks;
    },
  });
};

export const getIconComponent = (iconName: string): LucideIcon => {
  return iconMap[iconName] || Mail;
};

export { iconMap };
