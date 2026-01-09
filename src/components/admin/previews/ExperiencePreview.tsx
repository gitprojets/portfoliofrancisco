import { Sparkles, MapPin, Calendar } from "lucide-react";

interface Experience {
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

interface ExperiencePreviewProps {
  experiences: Experience[];
}

const ExperiencePreview = ({ experiences }: ExperiencePreviewProps) => {
  return (
    <div className="bg-background p-6 min-h-[400px]">
      {/* Header */}
      <div className="text-center mb-6">
        <span className="inline-block px-4 py-1.5 rounded-full glass-premium text-xs mb-2">
          Trajetória
        </span>
        <h2 className="text-xl font-display font-bold">
          Experiência <span className="text-gradient">Profissional</span>
        </h2>
      </div>

      <div className="space-y-4">
        {experiences.slice(0, 3).map((exp) => (
          <div
            key={exp.id}
            className={`p-4 rounded-xl glass-premium ${exp.featured ? 'ring-1 ring-primary/30' : ''}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm">{exp.title || 'Cargo'}</h3>
                  {exp.featured && (
                    <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-primary/20 text-[10px] text-primary">
                      <Sparkles className="w-2 h-2" />
                      Destaque
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{exp.company || 'Empresa'}</p>
              </div>
              <span className="text-[10px] px-2 py-1 rounded-full bg-secondary">
                {exp.type || 'Tipo'}
              </span>
            </div>

            <div className="flex items-center gap-3 text-[10px] text-muted-foreground mb-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {exp.location || 'Local'}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {exp.period || 'Período'}
              </span>
            </div>

            {exp.description.length > 0 && (
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                {exp.description[0]}
              </p>
            )}

            {exp.highlights.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {exp.highlights.slice(0, 3).map((tag, index) => (
                  <span key={index} className="px-2 py-0.5 text-[10px] bg-primary/10 text-primary rounded-full">
                    {tag}
                  </span>
                ))}
                {exp.highlights.length > 3 && (
                  <span className="text-[10px] text-muted-foreground">
                    +{exp.highlights.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}

        {experiences.length > 3 && (
          <p className="text-xs text-center text-muted-foreground">
            +{experiences.length - 3} mais experiências...
          </p>
        )}
      </div>
    </div>
  );
};

export default ExperiencePreview;
