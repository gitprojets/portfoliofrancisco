import { ExternalLink, Github, ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/hooks/useAnimations";
import SectionHeader from "@/components/shared/SectionHeader";
import { socialLinks } from "@/config/social-links";
import { usePortfolioContent } from "@/hooks/usePortfolioContent";

interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  results: string;
  image: string;
  github: string;
  live: string;
  featured: boolean;
}

const defaultProjects: Project[] = [
  {
    id: '1',
    title: "Dashboard Analytics",
    description: "Dashboard interativo para visualização de dados educacionais com gráficos dinâmicos e relatórios em tempo real.",
    problem: "Necessidade de acompanhar métricas educacionais de forma visual e intuitiva.",
    solution: "Interface moderna com React, gráficos interativos e filtros avançados.",
    technologies: ["React", "TypeScript", "Recharts", "Tailwind CSS"],
    results: "Redução de 40% no tempo de análise de dados",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    github: "#",
    live: "#",
    featured: true
  },
  {
    id: '2',
    title: "Plataforma Educacional",
    description: "Sistema de gestão escolar com funcionalidades de matrícula, acompanhamento de alunos e comunicação.",
    problem: "Processo manual e fragmentado de gestão escolar.",
    solution: "Plataforma unificada com automação de processos administrativos.",
    technologies: ["React", "Node.js", "PostgreSQL", "REST API"],
    results: "Otimização de 60% nos processos administrativos",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
    github: "#",
    live: "#",
    featured: true
  },
  {
    id: '3',
    title: "Landing Page Corporativa",
    description: "Site institucional responsivo com foco em conversão e experiência do usuário.",
    problem: "Empresa sem presença digital profissional.",
    solution: "Landing page otimizada para SEO com design moderno e CTA estratégicos.",
    technologies: ["HTML5", "CSS3", "JavaScript", "GSAP"],
    results: "Aumento de 150% em leads qualificados",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    github: "#",
    live: "#",
    featured: false
  },
  {
    id: '4',
    title: "E-commerce UI Kit",
    description: "Biblioteca de componentes reutilizáveis para projetos de e-commerce.",
    problem: "Falta de padronização em interfaces de lojas virtuais.",
    solution: "Design system completo com componentes acessíveis e responsivos.",
    technologies: ["React", "Storybook", "Styled Components", "Figma"],
    results: "Redução de 50% no tempo de desenvolvimento",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    github: "#",
    live: "#",
    featured: false
  }
];

const Projects = () => {
  const githubUrl = socialLinks.find(s => s.label === "GitHub")?.href || "#";
  
  const { data: content } = usePortfolioContent<{ projects: Project[] }>(
    'projects',
    { projects: defaultProjects }
  );

  const projects = content.projects || defaultProjects;

  return (
    <section id="projetos" className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      
      <div className="container relative">
        <SectionHeader
          badge="Portfólio"
          title="Projetos em"
          highlight="Destaque"
          description="Soluções que combinam design, funcionalidade e impacto real"
        />

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Reveal key={project.id || project.title} delay={index * 100}>
              <article className={`group rounded-3xl glass-premium overflow-hidden hover-lift hoverable ${project.featured ? 'border-gradient' : ''}`}>
                {/* Project Image */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={project.image || 'https://via.placeholder.com/600x400?text=Projeto'} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      <Sparkles className="w-3 h-3" />
                      Destaque
                    </div>
                  )}

                  {/* Quick Links */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    {project.github && project.github !== '#' && (
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors hoverable"
                        aria-label="Ver código"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.live && project.live !== '#' && (
                      <a 
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors hoverable"
                        aria-label="Ver projeto"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-7 md:p-8">
                  <h3 className="font-display font-bold text-2xl mb-3 group-hover:text-primary transition-colors flex items-center gap-2">
                    {project.title}
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </h3>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Result Highlight */}
                  {project.results && (
                    <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 mb-5">
                      <span className="text-xs text-primary font-semibold uppercase tracking-wider">Resultado</span>
                      <p className="text-sm text-foreground mt-1">{project.results}</p>
                    </div>
                  )}

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1.5 text-xs font-medium bg-secondary rounded-lg text-foreground/80 hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* View More */}
        <Reveal delay={400}>
          <div className="text-center mt-16">
            <Button 
              variant="heroOutline" 
              size="lg" 
              className="hoverable"
              asChild
            >
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Ver mais no GitHub
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Projects;
