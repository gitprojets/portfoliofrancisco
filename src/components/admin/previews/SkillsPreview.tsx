interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: Skill[];
}

interface SkillsPreviewProps {
  categories: SkillCategory[];
}

const SkillsPreview = ({ categories }: SkillsPreviewProps) => {
  return (
    <div className="bg-background p-6 min-h-[400px]">
      <div className="text-center mb-6">
        <span className="inline-block px-4 py-1.5 rounded-full glass-premium text-xs mb-2">
          Competências
        </span>
        <h2 className="text-xl font-display font-bold">
          Habilidades <span className="text-gradient">Técnicas</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.slice(0, 4).map((category) => (
          <div key={category.id} className="p-4 rounded-xl glass-premium">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">{category.icon}</span>
              <h3 className="font-semibold text-sm">{category.title}</h3>
            </div>
            
            <div className="space-y-3">
              {category.skills.slice(0, 3).map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs">{skill.name}</span>
                    <span className="text-xs text-primary">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-primary to-orange-400"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
              {category.skills.length > 3 && (
                <p className="text-xs text-muted-foreground">
                  +{category.skills.length - 3} mais...
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsPreview;
