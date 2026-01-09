import { Briefcase, Calendar, MapPin, ArrowUpRight } from "lucide-react";
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
      "Organização e exposição estratégica de mercadorias para maximizar visibilidade e atratividade",
      "Posicionamento de produtos em pontos de venda estratégicos para impulsionar vendas",
      "Aplicação correta de etiquetas de preço garantindo clareza na decisão de compra",
      "Atendimento ao cliente, auxiliando na localização de produtos e esclarecimento de dúvidas"
    ],
    highlights: ["Atendimento ao Cliente", "Organização", "Vendas"],
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
      "Desenvolvimento de pensamento analítico e resolução de problemas complexos",
      "Atenção meticulosa aos detalhes técnicos",
      "Trabalho sob pressão com prazos definidos",
      "Base sólida para transição para área de tecnologia"
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
    <section id="experiencia" className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gradient-radial from-primary/5 via-transparent to-transparent -translate-y-1/2" />
      
      <div className="container relative">
        <SectionHeader
          badge="Trajetória"
          title="Experiência"
          highlight="Profissional"
        />

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Animated Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2">
              <div className="h-full bg-gradient-to-b from-primary via-primary/50 to-transparent" />
            </div>

            {experiences.map((exp, index) => (
              <Reveal key={exp.id || exp.title + exp.company} delay={index * 150}>
                <div 
                  className={`relative pl-10 md:pl-0 pb-16 last:pb-0 ${
                    index % 2 === 0 ? 'md:pr-[calc(50%+3rem)]' : 'md:pl-[calc(50%+3rem)]'
                  }`}
                >
                  {/* Timeline Dot with Glow */}
                  <div className={`absolute left-0 md:left-1/2 w-5 h-5 bg-background border-2 border-primary rounded-full md:-translate-x-1/2 top-2 z-10 ${exp.featured ? 'glow-sm' : ''}`}>
                    <div className="absolute inset-1 bg-primary rounded-full" />
                  </div>
                  
                  {/* Content Card */}
                  <div className={`group p-7 md:p-8 rounded-3xl glass-premium hover-lift hoverable ${exp.featured ? 'border-gradient' : ''}`}>
                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      {exp.featured && (
                        <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground rounded-full">
                          Destaque
                        </span>
                      )}
                      <span className="px-3 py-1 text-xs font-medium bg-secondary text-foreground/80 rounded-full">
                        {exp.type}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {exp.period}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-2xl mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                      {exp.title}
                      <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-5">
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 text-primary/60" />
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-primary/60" />
                        {exp.location}
                      </span>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.highlights.map((tag) => (
                        <span 
                          key={tag}
                          className="px-3 py-1.5 text-xs font-medium bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
