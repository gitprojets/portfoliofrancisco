interface AboutContent {
  name: string;
  fullName: string;
  bio: string[];
  stats: { value: string; label: string }[];
  highlights: { title: string; description: string }[];
}

interface AboutPreviewProps {
  content: AboutContent;
}

const AboutPreview = ({ content }: AboutPreviewProps) => {
  return (
    <div className="bg-background p-6 min-h-[400px]">
      {/* Header */}
      <div className="text-center mb-6">
        <span className="inline-block px-4 py-1.5 rounded-full glass-premium text-xs mb-2">
          Quem sou eu
        </span>
        <h2 className="text-xl font-display font-bold">
          Olá, sou <span className="text-gradient">{content.name}</span>
        </h2>
        <p className="text-sm text-muted-foreground">{content.fullName}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bio */}
        <div className="p-4 rounded-xl glass-premium">
          <h3 className="font-semibold text-sm mb-3">Sobre</h3>
          <div className="space-y-2">
            {content.bio.slice(0, 2).map((paragraph, index) => (
              <p key={index} className="text-xs text-muted-foreground line-clamp-3">
                {paragraph}
              </p>
            ))}
            {content.bio.length > 2 && (
              <p className="text-xs text-muted-foreground">
                +{content.bio.length - 2} mais parágrafos...
              </p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {content.stats.slice(0, 3).map((stat, index) => (
              <div key={index} className="p-3 rounded-xl glass-premium text-center">
                <span className="block text-lg font-bold text-primary">{stat.value}</span>
                <span className="text-[10px] text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-2">
            {content.highlights.slice(0, 4).map((highlight, index) => (
              <div key={index} className="p-3 rounded-lg bg-secondary/30">
                <h4 className="font-medium text-xs">{highlight.title}</h4>
                <p className="text-[10px] text-muted-foreground line-clamp-1">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPreview;
