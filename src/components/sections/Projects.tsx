import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
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
    problem: "",
    solution: "",
    technologies: ["React", "TypeScript", "Recharts", "Tailwind CSS"],
    results: "Redução de 40% no tempo de análise",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    github: "#",
    live: "#",
    featured: true
  },
  {
    id: '2',
    title: "Plataforma Educacional",
    description: "Sistema de gestão escolar com funcionalidades de matrícula, acompanhamento de alunos e comunicação.",
    problem: "",
    solution: "",
    technologies: ["React", "Node.js", "PostgreSQL", "REST API"],
    results: "60% mais eficiência administrativa",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
    github: "#",
    live: "#",
    featured: true
  },
  {
    id: '3',
    title: "Landing Page Corporativa",
    description: "Site institucional responsivo com foco em conversão e experiência do usuário.",
    problem: "",
    solution: "",
    technologies: ["HTML5", "CSS3", "JavaScript", "GSAP"],
    results: "150% mais leads",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    github: "#",
    live: "#",
    featured: false
  },
  {
    id: '4',
    title: "E-commerce UI Kit",
    description: "Biblioteca de componentes reutilizáveis para projetos de e-commerce.",
    problem: "",
    solution: "",
    technologies: ["React", "Storybook", "Styled Components"],
    results: "50% menos tempo de dev",
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
    <section id="projetos" className="section-padding relative bg-secondary/30">
      <div className="container">
        <SectionHeader
          badge="Portfólio"
          title="Projetos em"
          highlight="Destaque"
          description="Soluções que combinam design, funcionalidade e impacto real"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <Reveal key={project.id || project.title} delay={index * 100}>
              <article className="group rounded-2xl bg-card border border-border overflow-hidden hover:border-foreground/20 transition-all duration-300">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image || 'https://via.placeholder.com/600x400'} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4 px-2 py-1 text-[10px] font-medium uppercase tracking-wider bg-foreground text-background rounded">
                      Destaque
                    </div>
                  )}

                  {/* Quick Links */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {project.github && project.github !== '#' && (
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
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
                        className="w-9 h-9 rounded-lg bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
                        aria-label="Ver projeto"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2 group-hover:text-foreground/80 transition-colors flex items-center gap-2">
                    {project.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Result */}
                  {project.results && (
                    <div className="px-3 py-2 rounded-lg bg-secondary mb-4 inline-block">
                      <span className="text-xs font-medium">{project.results}</span>
                    </div>
                  )}

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 py-1 text-xs bg-secondary text-muted-foreground rounded"
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
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              asChild
            >
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Ver mais no GitHub
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Projects;
