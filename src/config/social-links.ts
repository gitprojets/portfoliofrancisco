import { Linkedin, Github, Mail, type LucideIcon } from "lucide-react";

export interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

export const socialLinks: SocialLink[] = [
  { 
    icon: Linkedin, 
    href: "https://linkedin.com/in/francisco-douglas-sousa", 
    label: "LinkedIn" 
  },
  { 
    icon: Github, 
    href: "https://github.com/FranciscoDouglas-EngSoft", 
    label: "GitHub" 
  },
  { 
    icon: Mail, 
    href: "mailto:franciscodouglas77@outlook.com", 
    label: "Email" 
  },
];
