import { User, Code2, GraduationCap, Heart, ArrowUpRight } from "lucide-react";
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
    "Sou um profissional em constante evolução, com uma trajetória que conecta <span class=\"text-foreground font-medium\">tecnologia, educação e gestão</span>. Minha jornada começou no setor de mecânica, onde desenvolvi pensamento analítico e atenção aos detalhes — habilidades que hoje aplico no desenvolvimento de software.",
    "Atualmente, atuo como <span class=\"text-foreground font-medium\">Diretor Escolar</span> na Educação de Jovens e Adultos (EJA), liderando equipes e transformando vidas através da educação inclusiva. Paralelamente, estou em formação em <span class=\"text-foreground font-medium\">Engenharia de Software</span>, aprofundando conhecimentos em desenvolvimento Front-End e Full Stack.",
    "Acredito que a tecnologia é uma ferramenta poderosa para <span class=\"text-primary font-medium\">democratizar oportunidades</span> e criar impacto positivo na sociedade."
  ],
  stats: [
    { value: "5+", label: "Anos de Experiência" },
    { value: "20+", label: "Projetos Realizados" },
    { value: "100+", label: "Vidas Impactadas" }
  ],
  highlights: [
    { icon: "Code2", title: "Tecnologia", description: "Apaixonado por criar soluções digitais que fazem a diferença", color: "from-blue-500/20 to-cyan-500/20" },
    { icon: "GraduationCap", title: "Educação", description: "Compromisso com a transformação através do ensino", color: "from-green-500/20 to-emerald-500/20" },
    { icon: "User", title: "Gestão", description: "Liderança humanizada focada em resultados", color: "from-purple-500/20 to-pink-500/20" },
    { icon: "Heart", title: "Propósito", description: "Impacto social e inclusão como valores fundamentais", color: "from-primary/20 to-orange-500/20" }
  ]
};

const iconMap: Record<string, typeof Code2> = {
  Code2,
  GraduationCap,
  User,
  Heart
};

const About = () => {
  const { data: content } = usePortfolioContent<AboutContent>('about', defaultContent);

  const highlights = content.highlights || defaultContent.highlights;

  return (
    <section id="sobre" className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial from-primary/3 via-transparent to-transparent" />
      
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <Reveal>
            <div>
              <span className="inline-flex items-center gap-2 text-primary font-display font-medium text-sm tracking-wider uppercase mb-6">
                <span className="w-12 h-px bg-primary" />
                Sobre Mim
              </span>
              
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-[1.1]">
                {content.name || defaultContent.name}
                <span className="block text-gradient-animated mt-3">{content.subtitle || defaultContent.subtitle}</span>
              </h2>
              
              <div className="space-y-5 text-muted-foreground leading-relaxed text-lg">
                {(content.bio || defaultContent.bio).map((paragraph, index) => (
                  <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 mt-10 pt-10 border-t border-border">
                {(content.stats || defaultContent.stats).map((stat) => (
                  <div key={stat.label}>
                    <span className="text-4xl font-display font-bold text-gradient">{stat.value}</span>
                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Highlights Grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            {highlights.map((item, index) => {
              const IconComponent = iconMap[item.icon] || Code2;
              return (
                <Reveal key={item.title} delay={index * 100}>
                  <div 
                    className="group relative p-7 rounded-3xl glass-premium hover-lift hoverable overflow-hidden"
                  >
                    {/* Gradient Background on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                        <IconComponent className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="font-display font-semibold text-xl mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>

                    {/* Arrow Icon */}
                    <ArrowUpRight className="absolute top-6 right-6 w-5 h-5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
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
