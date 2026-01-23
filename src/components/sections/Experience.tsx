import { Briefcase, Calendar, MapPin } from "lucide-react";
import { Reveal } from "@/hooks/useAnimations";
import SectionHeader from "@/components/shared/SectionHeader";
import { usePortfolioContent } from "@/hooks/usePortfolioContent";

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string[];
  highlights: string[];
  featured: boolean;
}

const defaultExperiences: ExperienceItem[] = [
  {
    id: '1',
    title: "Diretor Escolar",
    company: "Educação de Jovens e Adultos (EJA)",
    location: "Brasil",
    period: "Atual",
    type: "Tempo Integral",
    description: [
      "Liderança de equipe pedagógica e administrativa com foco em resultados educacionais",
      "Implementação de projetos de inclusão digital para alunos adultos",
      "Gestão de recursos e planejamento estratégico escolar",
      "Desenvolvimento de parcerias comunitárias para fortalecer a educação"
    ],
    highlights: ["Liderança", "Gestão Estratégica", "Impacto Social"],
    featured: true
  },
  {
    id: '2',
    title: "Desenvolvedor Front-End",
    company: "Projetos Independentes & Freelance",
    location: "Remoto",
    period: "2023 - Atual",
    type: "Projetos",
    description: [
      "Desenvolvimento de interfaces responsivas com React e TypeScript",
      "Criação de landing pages e aplicações web modernas",
      "Implementação de designs do Figma com pixel-perfect precision",
      "Otimização de performance e SEO em projetos web"
    ],
    highlights: ["React", "TypeScript", "UI/UX"],
    featured: true
  },
  {
    id: '3',
    title: "Operador de Loja",
    company: "Assaí Atacadista",
    location: "Campinas, São Paulo",
    period: "Nov 2022 - Set 2023",
    type: "Tempo Integral",
    description: [
      "Organização e exposição estratégica de mercadorias",
      "Atendimento ao cliente e suporte na decisão de compra",
      "Aplicação correta de etiquetas de preço"
    ],
    highlights: ["Atendimento", "Organização", "Vendas"],
    featured: false
  },
  {
    id: '4',
    title: "Experiência Técnica",
    company: "Setor de Mecânica",
    location: "Brasil",
    period: "Experiência Prévia",
    type: "Técnico",
    description: [
      "Desenvolvimento de pensamento analítico e resolução de problemas",
      "Atenção meticulosa aos detalhes técnicos",
      "Trabalho sob pressão com prazos definidos"
    ],
    highlights: ["Análise Técnica", "Resolução de Problemas", "Precisão"],
    featured: false
  }
];

const Experience = () => {
  const { data: content } = usePortfolioContent<{ experiences: ExperienceItem[] }>(
    'experience',
    { experiences: defaultExperiences }
  );

  const experiences = content.experiences || defaultExperiences;

  return (
    <section id="experiencia" className="section-padding relative">
      <div className="container">
        <SectionHeader
          badge="Trajetória"
          title="Experiência"
          highlight="Profissional"
        />

        <div className="max-w-4xl mx-auto space-y-6">
          {experiences.map((exp, index) => (
            <Reveal key={exp.id || exp.title + exp.company} delay={index * 100}>
              <div className={`p-8 rounded-2xl border transition-all duration-300 ${
                exp.featured 
                  ? "bg-card border-foreground/10 hover:border-foreground/20" 
                  : "bg-card border-border hover:border-foreground/10"
              }`}>
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {exp.featured && (
                        <span className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-foreground text-background rounded">
                          Destaque
                        </span>
                      )}
                      <span className="px-2 py-0.5 text-xs text-muted-foreground bg-secondary rounded">
                        {exp.type}
                      </span>
                    </div>
                    <h3 className="font-semibold text-xl">{exp.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-2">
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4" />
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                  </span>
                </div>

                {/* Description */}
                <ul className="space-y-2 mb-6">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-1 h-1 bg-foreground rounded-full mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2">
                  {exp.highlights.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-secondary text-foreground rounded-full"
                    >
                      {tag}
                    </span>
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

export default Experience;
