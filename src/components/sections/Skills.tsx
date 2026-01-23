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
    <section id="habilidades" className="section-padding relative bg-secondary/30">
      <div className="container">
        <SectionHeader
          badge="Competências"
          title="Habilidades"
          highlight="Técnicas"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <Reveal key={category.id || category.title} delay={categoryIndex * 100}>
              <div className="p-8 rounded-2xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="font-semibold text-lg">{category.title}</h3>
                </div>
                
                <div className="space-y-5">
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
        <span className="text-sm">{name}</span>
        <span className="text-xs text-muted-foreground font-mono">{level}%</span>
      </div>
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full bg-foreground transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
});

SkillBar.displayName = "SkillBar";

export default Skills;
