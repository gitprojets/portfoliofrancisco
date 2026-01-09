import { Linkedin, Github, Mail, type LucideIcon } from "lucide-react";

export interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

export const socialLinks: SocialLink[] = [
  { 
    icon: Linkedin, 
    href: "https://linkedin.com/in/franciscodouglas", 
    label: "LinkedIn" 
  },
  { 
    icon: Github, 
    href: "https://github.com/franciscodouglas", 
    label: "GitHub" 
  },
  { 
    icon: Mail, 
    href: "mailto:contato@franciscodouglas.dev", 
    label: "Email" 
  },
];
