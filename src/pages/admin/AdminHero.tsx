import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Save, Loader2 } from 'lucide-react';
import LivePreview from '@/components/admin/LivePreview';
import HeroPreview from '@/components/admin/previews/HeroPreview';
interface HeroContent {
  badge: string;
  headline: string[];
  subtitle: string;
  ctaButtons: { primary: string; secondary: string };
}

const defaultContent: HeroContent = {
  badge: "Disponível para novos projetos",
  headline: ["Transformando", "ideias em", "experiências digitais"],
  subtitle: "Desenvolvedor Front-End & Full Stack | Líder em Educação | Unindo tecnologia, gestão e propósito para criar impacto real.",
  ctaButtons: { primary: "Ver Projetos", secondary: "Entrar em Contato" }
};

const AdminHero = () => {
  const [content, setContent] = useState<HeroContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_content')
        .select('content')
        .eq('section_key', 'hero')
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data?.content) {
        setContent(data.content as unknown as HeroContent);
      }
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveContent = async () => {
    setIsSaving(true);
    try {
      const { data: existing } = await supabase
        .from('portfolio_content')
        .select('id')
        .eq('section_key', 'hero')
        .maybeSingle();

      let error;
      if (existing) {
        const result = await supabase
          .from('portfolio_content')
          .update({
            content: JSON.parse(JSON.stringify(content)),
            updated_at: new Date().toISOString()
          })
          .eq('section_key', 'hero');
        error = result.error;
      } else {
        const result = await supabase
          .from('portfolio_content')
          .insert([{
            section_key: 'hero',
            content: JSON.parse(JSON.stringify(content)),
            updated_at: new Date().toISOString()
          }]);
        error = result.error;
      }

      if (error) throw error;

      toast({
        title: 'Salvo!',
        description: 'Hero atualizado com sucesso.',
      });
    } catch (error) {
      console.error('Error saving:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar as alterações.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="Hero" description="Edite a seção inicial do portfólio">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Hero" description="Edite a seção inicial do portfólio">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Editor */}
        <div className="space-y-6">
          <div className="glass-premium rounded-xl p-6 space-y-6">
            <div className="space-y-2">
              <Label>Badge (texto do topo)</Label>
              <Input
                value={content.badge}
                onChange={(e) => setContent({ ...content, badge: e.target.value })}
                placeholder="Disponível para novos projetos"
              />
            </div>

            <div className="space-y-4">
              <Label>Título Principal (3 linhas)</Label>
              {content.headline.map((line, index) => (
                <Input
                  key={index}
                  value={line}
                  onChange={(e) => {
                    const newHeadline = [...content.headline];
                    newHeadline[index] = e.target.value;
                    setContent({ ...content, headline: newHeadline });
                  }}
                  placeholder={`Linha ${index + 1}`}
                />
              ))}
            </div>

            <div className="space-y-2">
              <Label>Subtítulo</Label>
              <Textarea
                value={content.subtitle}
                onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
                rows={3}
                placeholder="Descrição profissional..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Botão Primário</Label>
                <Input
                  value={content.ctaButtons.primary}
                  onChange={(e) => setContent({ 
                    ...content, 
                    ctaButtons: { ...content.ctaButtons, primary: e.target.value } 
                  })}
                  placeholder="Ver Projetos"
                />
              </div>
              <div className="space-y-2">
                <Label>Botão Secundário</Label>
                <Input
                  value={content.ctaButtons.secondary}
                  onChange={(e) => setContent({ 
                    ...content, 
                    ctaButtons: { ...content.ctaButtons, secondary: e.target.value } 
                  })}
                  placeholder="Entrar em Contato"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={saveContent} disabled={isSaving} size="lg">
              {isSaving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Salvar Alterações
            </Button>
          </div>
        </div>

        {/* Live Preview */}
        <div className="xl:sticky xl:top-8 xl:self-start">
          <LivePreview>
            <HeroPreview content={content} />
          </LivePreview>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminHero;
