import { Award, GraduationCap } from "lucide-react";

interface Education {
  id: string;
  degree: string;
  institution: string;
  status: string;
  description: string;
  progress: number;
}

interface EducationContent {
  education: Education[];
  certifications: string[];
}

interface EducationPreviewProps {
  content: EducationContent;
}

const EducationPreview = ({ content }: EducationPreviewProps) => {
  return (
    <div className="bg-background p-6 min-h-[400px]">
      {/* Header */}
      <div className="text-center mb-6">
        <span className="inline-block px-4 py-1.5 rounded-full glass-premium text-xs mb-2">
          Formação
        </span>
        <h2 className="text-xl font-display font-bold">
          Educação & <span className="text-gradient">Certificações</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Education */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-primary" />
            Formação Acadêmica
          </h3>
          {content.education.slice(0, 2).map((edu) => (
            <div key={edu.id} className="p-4 rounded-xl glass-premium">
              <h4 className="font-medium text-sm">{edu.degree || 'Curso'}</h4>
              <p className="text-xs text-muted-foreground mb-2">
                {edu.institution || 'Instituição'}
              </p>
              
              <div className="flex items-center justify-between text-[10px] mb-1">
                <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                  {edu.status || 'Status'}
                </span>
                <span className="text-muted-foreground">{edu.progress}%</span>
              </div>
              
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-orange-400"
                  style={{ width: `${edu.progress}%` }}
                />
              </div>
              
              {edu.description && (
                <p className="text-[10px] text-muted-foreground mt-2 line-clamp-2">
                  {edu.description}
                </p>
              )}
            </div>
          ))}
          
          {content.education.length > 2 && (
            <p className="text-xs text-center text-muted-foreground">
              +{content.education.length - 2} mais formações...
            </p>
          )}
        </div>

        {/* Certifications */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <Award className="w-4 h-4 text-primary" />
            Certificações
          </h3>
          <div className="p-4 rounded-xl glass-premium">
            <div className="flex flex-wrap gap-2">
              {content.certifications.slice(0, 6).map((cert, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-secondary rounded-full"
                >
                  <Award className="w-3 h-3 text-primary" />
                  {cert}
                </span>
              ))}
              {content.certifications.length > 6 && (
                <span className="px-3 py-1.5 text-xs text-muted-foreground">
                  +{content.certifications.length - 6} mais...
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationPreview;
