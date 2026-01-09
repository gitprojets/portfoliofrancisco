import { GraduationCap, Award, BookOpen, Sparkles } from "lucide-react";
import { Reveal } from "@/hooks/useAnimations";
import SectionHeader from "@/components/shared/SectionHeader";
import { usePortfolioContent } from "@/hooks/usePortfolioContent";

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  status: string;
  icon: string;
  description: string;
  progress: number;
}

interface EducationContent {
  education: EducationItem[];
  certifications: string[];
}

const defaultContent: EducationContent = {
  education: [
    {
      id: '1',
      degree: "Engenharia de Software",
      institution: "Em andamento",
      status: "Cursando",
      icon: "GraduationCap",
      description: "Formação completa em desenvolvimento de software, arquitetura de sistemas e metodologias ágeis.",
      progress: 60
    },
    {
      id: '2',
      degree: "Gestão Financeira",
      institution: "Concluído",
      status: "Graduação",
      icon: "BookOpen",
      description: "Base sólida em análise financeira, planejamento estratégico e gestão de recursos.",
      progress: 100
    },
    {
      id: '3',
      degree: "Gestão Escolar",
      institution: "Pós-Graduação",
      status: "Especialização",
      icon: "GraduationCap",
      description: "Especialização em liderança educacional, gestão de pessoas e políticas públicas.",
      progress: 100
    }
  ],
  certifications: [
    "Desenvolvimento Front-End",
    "JavaScript Avançado",
    "HTML5 & CSS3",
    "React.js",
    "UX/UI Design",
    "Python Fundamentos",
    "Git & GitHub",
    "Metodologias Ágeis"
  ]
};

const iconMap: Record<string, typeof GraduationCap> = {
  GraduationCap,
  BookOpen
};

const Education = () => {
  const { data: content } = usePortfolioContent<EducationContent>('education', defaultContent);

  const education = content.education || defaultContent.education;
  const certifications = content.certifications || defaultContent.certifications;

  return (
    <section id="formacao" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-transparent to-secondary/30" />
      
      <div className="container relative">
        <SectionHeader
          badge="Formação"
          title="Educação &"
          highlight="Certificações"
        />

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {education.map((item, index) => {
            const IconComponent = iconMap[item.icon] || GraduationCap;
            return (
              <Reveal key={item.id || item.degree} delay={index * 100}>
                <div className="group h-full p-8 md:p-10 rounded-3xl glass-premium hover-lift hoverable relative overflow-hidden">
                  {/* Progress Indicator */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-muted overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-orange-400 transition-all duration-1000"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>

                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4">
                      {item.status === "Cursando" && <Sparkles className="w-3 h-3" />}
                      {item.status}
                    </span>
                    
                    <h3 className="font-display font-bold text-2xl mb-2 group-hover:text-primary transition-colors">
                      {item.degree}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">{item.institution}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Certifications */}
        <Reveal delay={300}>
          <div className="p-8 md:p-12 rounded-3xl glass-premium">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <Award className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-2xl">Certificações</h3>
                <p className="text-sm text-muted-foreground">Aprendizado contínuo e especializado</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {certifications.map((cert, index) => (
                <span 
                  key={cert}
                  className="px-5 py-2.5 bg-secondary rounded-full text-sm font-medium hover:bg-primary/20 hover:text-primary transition-all duration-300 cursor-default hoverable"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Education;
