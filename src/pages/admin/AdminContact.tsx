import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Save, Plus, Trash2, Loader2 } from 'lucide-react';
import LivePreview from '@/components/admin/LivePreview';
import ContactPreview from '@/components/admin/previews/ContactPreview';

interface ContactContent {
  sectionTitle: string;
  sectionHighlight: string;
  sectionDescription: string;
  opportunityTitle: string;
  opportunityDescription: string;
  opportunityTags: string[];
  location: string;
}

const defaultContent: ContactContent = {
  sectionTitle: "Vamos",
  sectionHighlight: "Conversar?",
  sectionDescription: "Estou sempre aberto a novas oportunidades, projetos desafiadores e conversas sobre tecnologia, educação e inovação.",
  opportunityTitle: "Aberto para Oportunidades",
  opportunityDescription: "Buscando posições em Front-End, Full Stack, EdTech ou projetos freelance que combinem tecnologia e impacto social.",
  opportunityTags: ["Front-End", "Full Stack", "EdTech", "Freelance"],
  location: "Brasil"
};

const AdminContact = () => {
  const [content, setContent] = useState<ContactContent>(defaultContent);
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
        .eq('section_key', 'contact')
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data?.content) {
        setContent(data.content as unknown as ContactContent);
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
        .eq('section_key', 'contact')
        .maybeSingle();

      let error;
      if (existing) {
        const result = await supabase
          .from('portfolio_content')
          .update({
            content: JSON.parse(JSON.stringify(content)),
            updated_at: new Date().toISOString()
          })
          .eq('section_key', 'contact');
        error = result.error;
      } else {
        const result = await supabase
          .from('portfolio_content')
          .insert([{
            section_key: 'contact',
            content: JSON.parse(JSON.stringify(content)),
            updated_at: new Date().toISOString()
          }]);
        error = result.error;
      }

      if (error) throw error;

      toast({
        title: 'Salvo!',
        description: 'Contato atualizado com sucesso.',
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

  const addTag = () => {
    setContent({
      ...content,
      opportunityTags: [...content.opportunityTags, '']
    });
  };

  const removeTag = (index: number) => {
    setContent({
      ...content,
      opportunityTags: content.opportunityTags.filter((_, i) => i !== index)
    });
  };

  const updateTag = (index: number, value: string) => {
    setContent({
      ...content,
      opportunityTags: content.opportunityTags.map((tag, i) =>
        i === index ? value : tag
      )
    });
  };

  if (isLoading) {
    return (
      <AdminLayout title="Contato" description="Gerencie as informações de contato">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Contato" description="Gerencie as informações de contato">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Editor */}
        <div className="space-y-6">
          {/* Section Header */}
          <div className="glass-premium rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold">Cabeçalho da Seção</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Título</Label>
                <Input
                  value={content.sectionTitle}
                  onChange={(e) => setContent({ ...content, sectionTitle: e.target.value })}
                  placeholder="Vamos"
                />
              </div>
              <div className="space-y-2">
                <Label>Destaque</Label>
                <Input
                  value={content.sectionHighlight}
                  onChange={(e) => setContent({ ...content, sectionHighlight: e.target.value })}
                  placeholder="Conversar?"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea
                value={content.sectionDescription}
                onChange={(e) => setContent({ ...content, sectionDescription: e.target.value })}
                placeholder="Descrição da seção..."
                rows={2}
              />
            </div>
          </div>

          {/* Location */}
          <div className="glass-premium rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold">Localização</h3>
            <div className="space-y-2">
              <Label>Local</Label>
              <Input
                value={content.location}
                onChange={(e) => setContent({ ...content, location: e.target.value })}
                placeholder="Brasil"
              />
            </div>
          </div>

          {/* Opportunity Card */}
          <div className="glass-premium rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold">Card de Oportunidades</h3>
            <div className="space-y-2">
              <Label>Título</Label>
              <Input
                value={content.opportunityTitle}
                onChange={(e) => setContent({ ...content, opportunityTitle: e.target.value })}
                placeholder="Aberto para Oportunidades"
              />
            </div>
            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea
                value={content.opportunityDescription}
                onChange={(e) => setContent({ ...content, opportunityDescription: e.target.value })}
                placeholder="Descrição das oportunidades..."
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label>Tags de Oportunidade</Label>
              <div className="space-y-2">
                {content.opportunityTags.map((tag, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={tag}
                      onChange={(e) => updateTag(index, e.target.value)}
                      placeholder="Tag"
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTag(index)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addTag}>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Tag
                </Button>
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
            <ContactPreview content={content} />
          </LivePreview>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminContact;
