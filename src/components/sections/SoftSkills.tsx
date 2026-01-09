import { Users, Lightbulb, Target, MessageCircle, Brain, Compass, Quote } from "lucide-react";
import { Reveal } from "@/hooks/useAnimations";
import SectionHeader from "@/components/shared/SectionHeader";
import { usePortfolioContent } from "@/hooks/usePortfolioContent";

interface SoftSkill {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface SoftSkillsContent {
  skills: SoftSkill[];
  quote: string;
  quoteAuthor: string;
}

const defaultContent: SoftSkillsContent = {
  skills: [
    { id: '1', icon: 'Users', title: "Liderança Humanizada", description: "Gestão focada em pessoas, desenvolvendo talentos e criando ambientes colaborativos onde todos podem crescer." },
    { id: '2', icon: 'Brain', title: "Tomada de Decisão", description: "Capacidade de analisar cenários complexos e tomar decisões estratégicas baseadas em dados e experiência." },
    { id: '3', icon: 'Target', title: "Planejamento Estratégico", description: "Visão de longo prazo combinada com execução precisa para alcançar objetivos e metas definidas." },
    { id: '4', icon: 'MessageCircle', title: "Comunicação Efetiva", description: "Habilidade de articular ideias claramente para diferentes públicos, facilitando alinhamentos e resolução de conflitos." },
    { id: '5', icon: 'Lightbulb', title: "Resolução de Problemas", description: "Abordagem criativa e analítica para identificar causas raiz e desenvolver soluções inovadoras." },
    { id: '6', icon: 'Compass', title: "Adaptabilidade", description: "Flexibilidade para se ajustar a novos cenários, tecnologias e desafios com agilidade e resiliência." }
  ],
  quote: "Acredito que a verdadeira liderança não é sobre ter seguidores, mas sobre desenvolver outros líderes e criar impacto positivo em cada pessoa que cruza nosso caminho.",
  quoteAuthor: "Francisco Douglas"
};

const iconMap: Record<string, typeof Users> = {
  Users,
  Brain,
  Target,
  MessageCircle,
  Lightbulb,
  Compass
};

const SoftSkills = () => {
  const { data: content } = usePortfolioContent<SoftSkillsContent>('softskills', defaultContent);

  const skills = content.skills || defaultContent.skills;

  return (
    <section id="softskills" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-transparent to-secondary/30" />
      
      <div className="container relative">
        <SectionHeader
          badge="Competências"
          title="Soft Skills &"
          highlight="Liderança"
          description="Habilidades interpessoais e de gestão desenvolvidas ao longo de uma trajetória multidisciplinar em tecnologia, educação e liderança"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {skills.map((skill, index) => {
            const IconComponent = iconMap[skill.icon] || Users;
            return (
              <Reveal key={skill.id || skill.title} delay={index * 100}>
                <div className="group h-full p-8 md:p-10 rounded-3xl glass-premium hover-lift hoverable">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h3 className="font-display font-semibold text-xl mb-3 group-hover:text-primary transition-colors">
                    {skill.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Quote/Philosophy */}
        <Reveal delay={600}>
          <div className="relative p-10 md:p-16 rounded-[2.5rem] glass-premium text-center overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/10 via-transparent to-transparent" />
            <div className="absolute top-8 left-8 opacity-20">
              <Quote className="w-16 h-16 text-primary" />
            </div>
            
            <blockquote className="relative z-10">
              <p className="text-2xl md:text-3xl lg:text-4xl font-display font-medium leading-relaxed mb-8">
                "{content.quote || defaultContent.quote}"
              </p>
              <footer className="flex items-center justify-center gap-4">
                <span className="w-12 h-px bg-primary" />
                <span className="text-muted-foreground font-medium">{content.quoteAuthor || defaultContent.quoteAuthor}</span>
                <span className="w-12 h-px bg-primary" />
              </footer>
            </blockquote>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default SoftSkills;
