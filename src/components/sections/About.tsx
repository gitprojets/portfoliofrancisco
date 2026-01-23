import { Code2, GraduationCap, Users, Lightbulb } from "lucide-react";
import { Reveal } from "@/hooks/useAnimations";
import { usePortfolioContent } from "@/hooks/usePortfolioContent";

interface AboutContent {
  name: string;
  subtitle: string;
  bio: string[];
  stats: { value: string; label: string }[];
  highlights: { icon: string; title: string; description: string; color: string }[];
}

const defaultContent: AboutContent = {
  name: "Francisco Douglas",
  subtitle: "de Sousa Beserra",
  bio: [
    "Sou um profissional em constante evolução, com uma trajetória que conecta tecnologia, educação e gestão. Minha jornada começou no setor de mecânica, onde desenvolvi pensamento analítico e atenção aos detalhes.",
    "Atualmente, atuo como Diretor Escolar na Educação de Jovens e Adultos (EJA), liderando equipes e transformando vidas através da educação inclusiva. Paralelamente, estou em formação em Engenharia de Software.",
    "Acredito que a tecnologia é uma ferramenta poderosa para democratizar oportunidades e criar impacto positivo na sociedade."
  ],
  stats: [
    { value: "5+", label: "Anos de Experiência" },
    { value: "20+", label: "Projetos Realizados" },
    { value: "100+", label: "Vidas Impactadas" }
  ],
  highlights: [
    { icon: "Code2", title: "Tecnologia", description: "Soluções digitais que fazem a diferença", color: "" },
    { icon: "GraduationCap", title: "Educação", description: "Transformação através do ensino", color: "" },
    { icon: "Users", title: "Gestão", description: "Liderança focada em resultados", color: "" },
    { icon: "Lightbulb", title: "Inovação", description: "Pensamento criativo e estratégico", color: "" }
  ]
};

const iconMap: Record<string, typeof Code2> = {
  Code2,
  GraduationCap,
  Users,
  User: Users,
  Lightbulb,
  Heart: Lightbulb
};

const About = () => {
  const { data: content } = usePortfolioContent<AboutContent>('about', defaultContent);
  const highlights = content.highlights || defaultContent.highlights;

  return (
    <section id="sobre" className="section-padding relative">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Content */}
          <Reveal>
            <div>
              <span className="inline-block text-sm font-medium text-muted-foreground tracking-wider uppercase mb-6">
                Sobre Mim
              </span>
              
              <h2 className="text-display-sm md:text-display-md font-bold mb-8 tracking-tight">
                {content.name || defaultContent.name}
                <span className="block text-muted-foreground">{content.subtitle || defaultContent.subtitle}</span>
              </h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {(content.bio || defaultContent.bio).map((paragraph, index) => (
                  <p key={index}>{paragraph.replace(/<[^>]*>/g, '')}</p>
                ))}
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-12 mt-12 pt-12 border-t border-border">
                {(content.stats || defaultContent.stats).map((stat) => (
                  <div key={stat.label}>
                    <span className="text-4xl font-bold tracking-tight">{stat.value}</span>
                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Highlights Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => {
              const IconComponent = iconMap[item.icon] || Code2;
              return (
                <Reveal key={item.title} delay={index * 100}>
                  <div className="group p-6 rounded-2xl border border-border bg-card hover:border-foreground/20 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-foreground group-hover:text-background transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
