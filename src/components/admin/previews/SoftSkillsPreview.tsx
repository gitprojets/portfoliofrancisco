import { Users, Brain, Target, MessageCircle, Lightbulb, Compass, Quote, LucideIcon } from "lucide-react";

interface SoftSkill {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface SoftSkillsContent {
  skills: SoftSkill[];
  quote: string;
  quoteAuthor: string;
}

interface SoftSkillsPreviewProps {
  content: SoftSkillsContent;
}

const iconMap: Record<string, LucideIcon> = {
  Users,
  Brain,
  Target,
  MessageCircle,
  Lightbulb,
  Compass,
};

const SoftSkillsPreview = ({ content }: SoftSkillsPreviewProps) => {
  return (
    <div className="bg-background p-6 min-h-[400px]">
      {/* Header */}
      <div className="text-center mb-6">
        <span className="inline-block px-4 py-1.5 rounded-full glass-premium text-xs mb-2">
          Diferenciais
        </span>
        <h2 className="text-xl font-display font-bold">
          Soft <span className="text-gradient">Skills</span>
        </h2>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {content.skills.slice(0, 6).map((skill) => {
          const IconComponent = iconMap[skill.icon] || Users;
          return (
            <div key={skill.id} className="p-4 rounded-xl glass-premium text-center group">
              <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <IconComponent className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-medium text-xs mb-1">{skill.title || 'Habilidade'}</h4>
              <p className="text-[10px] text-muted-foreground line-clamp-2">
                {skill.description || 'Descrição...'}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quote */}
      {content.quote && (
        <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 via-transparent to-primary/5 border border-primary/10">
          <div className="flex gap-3">
            <Quote className="w-6 h-6 text-primary shrink-0" />
            <div>
              <p className="text-xs italic text-muted-foreground mb-2 line-clamp-3">
                "{content.quote}"
              </p>
              <p className="text-[10px] font-medium text-primary">
                — {content.quoteAuthor || 'Autor'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoftSkillsPreview;
