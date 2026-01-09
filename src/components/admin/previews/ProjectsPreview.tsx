import { ExternalLink, Github, Sparkles } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  featured: boolean;
  results?: string;
}

interface ProjectsPreviewProps {
  projects: Project[];
}

const ProjectsPreview = ({ projects }: ProjectsPreviewProps) => {
  return (
    <div className="bg-background p-6 min-h-[400px]">
      <div className="text-center mb-6">
        <span className="inline-block px-4 py-1.5 rounded-full glass-premium text-xs mb-2">
          Portfólio
        </span>
        <h2 className="text-xl font-display font-bold">
          Projetos em <span className="text-gradient">Destaque</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.slice(0, 4).map((project) => (
          <article 
            key={project.id} 
            className={`rounded-xl glass-premium overflow-hidden ${project.featured ? 'ring-1 ring-primary/30' : ''}`}
          >
            {/* Image */}
            <div className="relative h-32 overflow-hidden">
              <img 
                src={project.image || 'https://via.placeholder.com/400x200?text=Projeto'} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              
              {project.featured && (
                <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                  <Sparkles className="w-2.5 h-2.5" />
                  Destaque
                </div>
              )}

              <div className="absolute top-2 right-2 flex gap-1">
                <span className="w-6 h-6 rounded-lg bg-background/80 flex items-center justify-center">
                  <Github className="w-3 h-3" />
                </span>
                <span className="w-6 h-6 rounded-lg bg-background/80 flex items-center justify-center">
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-sm mb-1">{project.title}</h3>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                {project.description}
              </p>

              {project.results && (
                <div className="p-2 rounded-lg bg-primary/5 border border-primary/10 mb-3">
                  <span className="text-[10px] text-primary font-semibold uppercase">Resultado</span>
                  <p className="text-xs text-foreground line-clamp-1">{project.results}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-1">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span 
                    key={tech}
                    className="px-2 py-0.5 text-[10px] font-medium bg-secondary rounded text-foreground/80"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="text-[10px] text-muted-foreground">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPreview;
