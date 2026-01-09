import { Reveal } from "@/hooks/useAnimations";
import { memo, useEffect, useRef, useState } from "react";
import SectionHeader from "@/components/shared/SectionHeader";
import { usePortfolioContent } from "@/hooks/usePortfolioContent";

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: Skill[];
}

const defaultCategories: SkillCategory[] = [
  {
    id: '1',
    title: "Linguagens & Frameworks",
    icon: "💻",
    skills: [
      { name: "JavaScript", level: 85 },
      { name: "TypeScript", level: 75 },
      { name: "React", level: 80 },
      { name: "HTML5", level: 95 },
      { name: "CSS3 / Sass", level: 90 },
      { name: "Python", level: 60 },
    ]
  },
  {
    id: '2',
    title: "Ferramentas & Tecnologias",
    icon: "🛠️",
    skills: [
      { name: "Git / GitHub", level: 85 },
      { name: "VS Code", level: 90 },
      { name: "Figma", level: 70 },
      { name: "Node.js", level: 65 },
      { name: "REST APIs", level: 75 },
      { name: "Tailwind CSS", level: 85 },
    ]
  },
  {
    id: '3',
    title: "Boas Práticas",
    icon: "✨",
    skills: [
      { name: "Clean Code", level: 80 },
      { name: "Responsividade", level: 90 },
      { name: "Acessibilidade", level: 75 },
      { name: "SEO", level: 70 },
      { name: "Performance", level: 75 },
      { name: "Versionamento", level: 85 },
    ]
  },
  {
    id: '4',
    title: "UX/UI & Design",
    icon: "🎨",
    skills: [
      { name: "Design Responsivo", level: 88 },
      { name: "Prototipação", level: 70 },
      { name: "Design Systems", level: 72 },
      { name: "User Research", level: 65 },
      { name: "Wireframing", level: 68 },
      { name: "Mobile First", level: 85 },
    ]
  }
];

const Skills = () => {
  const { data: content } = usePortfolioContent<{ categories: SkillCategory[] }>(
    'skills',
    { categories: defaultCategories }
  );

  const skillCategories = content.categories || defaultCategories;

  return (
    <section id="habilidades" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-transparent to-secondary/30" />
      
      <div className="container relative">
        <SectionHeader
          badge="Competências"
          title="Habilidades"
          highlight="Técnicas"
        />

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <Reveal key={category.id || category.title} delay={categoryIndex * 100}>
              <div className="p-8 md:p-10 rounded-3xl glass-premium hover-lift group">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-3xl">{category.icon}</span>
                  <h3 className="font-display font-semibold text-xl">{category.title}</h3>
                </div>
                
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar 
                      key={skill.name} 
                      name={skill.name} 
                      level={skill.level}
                      delay={(categoryIndex * 6 + skillIndex) * 50}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

interface SkillBarProps {
  name: string;
  level: number;
  delay: number;
}

const SkillBar = memo(({ name, level, delay }: SkillBarProps) => {
  const [width, setWidth] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = barRef.current;
    if (!element || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            setTimeout(() => setWidth(level), delay);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [level, delay, hasAnimated]);

  return (
    <div ref={barRef}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-xs text-primary font-mono">{level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full bg-gradient-to-r from-primary via-primary to-orange-400 transition-all duration-1000 ease-out relative"
          style={{ width: `${width}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  );
});

SkillBar.displayName = "SkillBar";

export default Skills;
