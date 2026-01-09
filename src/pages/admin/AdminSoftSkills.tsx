import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Save, Plus, Trash2, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LivePreview from '@/components/admin/LivePreview';
import SoftSkillsPreview from '@/components/admin/previews/SoftSkillsPreview';
import SortableList from '@/components/admin/SortableList';
import SortableItem from '@/components/admin/SortableItem';

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

const iconOptions = [
  { value: 'Users', label: 'Liderança' },
  { value: 'Brain', label: 'Cérebro' },
  { value: 'Target', label: 'Alvo' },
  { value: 'MessageCircle', label: 'Comunicação' },
  { value: 'Lightbulb', label: 'Ideia' },
  { value: 'Compass', label: 'Bússola' },
];

const defaultContent: SoftSkillsContent = {
  skills: [
    { id: '1', icon: 'Users', title: 'Liderança Humanizada', description: 'Gestão focada em pessoas...' },
  ],
  quote: "Acredito que a verdadeira liderança não é sobre ter seguidores, mas sobre desenvolver outros líderes...",
  quoteAuthor: "Francisco Douglas"
};

const AdminSoftSkills = () => {
  const [content, setContent] = useState<SoftSkillsContent>(defaultContent);
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
        .eq('section_key', 'softskills')
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data?.content) {
        setContent(data.content as unknown as SoftSkillsContent);
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
        .eq('section_key', 'softskills')
        .maybeSingle();

      let error;
      if (existing) {
        const result = await supabase
          .from('portfolio_content')
          .update({
            content: JSON.parse(JSON.stringify(content)),
            updated_at: new Date().toISOString()
          })
          .eq('section_key', 'softskills');
        error = result.error;
      } else {
        const result = await supabase
          .from('portfolio_content')
          .insert([{
            section_key: 'softskills',
            content: JSON.parse(JSON.stringify(content)),
            updated_at: new Date().toISOString()
          }]);
        error = result.error;
      }

      if (error) throw error;

      toast({
        title: 'Salvo!',
        description: 'Soft Skills atualizadas com sucesso.',
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

  const addSkill = () => {
    setContent({
      ...content,
      skills: [...content.skills, {
        id: Date.now().toString(),
        icon: 'Users',
        title: '',
        description: ''
      }]
    });
  };

  const removeSkill = (id: string) => {
    setContent({
      ...content,
      skills: content.skills.filter(s => s.id !== id)
    });
  };

  const updateSkill = (id: string, field: keyof SoftSkill, value: string) => {
    setContent({
      ...content,
      skills: content.skills.map(s =>
        s.id === id ? { ...s, [field]: value } : s
      )
    });
  };

  if (isLoading) {
    return (
      <AdminLayout title="Soft Skills" description="Gerencie suas habilidades interpessoais">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Soft Skills" description="Gerencie suas habilidades interpessoais">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Editor */}
        <div className="space-y-6">
          <div className="flex justify-end">
            <Button onClick={addSkill} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Nova Soft Skill
            </Button>
          </div>

          <SortableList
            items={content.skills}
            onReorder={(skills) => setContent({ ...content, skills })}
          >
            <div className="space-y-6">
              {content.skills.map((skill) => (
                <SortableItem key={skill.id} id={skill.id}>
                  <div className="glass-premium rounded-xl p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Ícone</Label>
                            <Select
                              value={skill.icon}
                              onValueChange={(value) => updateSkill(skill.id, 'icon', value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {iconOptions.map(option => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Título</Label>
                            <Input
                              value={skill.title}
                              onChange={(e) => updateSkill(skill.id, 'title', e.target.value)}
                              placeholder="Nome da habilidade"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Descrição</Label>
                          <Textarea
                            value={skill.description}
                            onChange={(e) => updateSkill(skill.id, 'description', e.target.value)}
                            placeholder="Descreva a habilidade..."
                            rows={2}
                          />
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSkill(skill.id)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </SortableItem>
              ))}
            </div>
          </SortableList>

          {/* Quote Section */}
          <div className="glass-premium rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold">Citação/Filosofia</h3>
            <div className="space-y-2">
              <Label>Citação</Label>
              <Textarea
                value={content.quote}
                onChange={(e) => setContent({ ...content, quote: e.target.value })}
                placeholder="Sua citação ou filosofia..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Autor</Label>
              <Input
                value={content.quoteAuthor}
                onChange={(e) => setContent({ ...content, quoteAuthor: e.target.value })}
                placeholder="Nome do autor"
              />
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
            <SoftSkillsPreview content={content} />
          </LivePreview>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSoftSkills;
