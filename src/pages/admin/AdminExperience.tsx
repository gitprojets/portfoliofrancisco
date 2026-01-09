import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Save, Plus, Trash2, Loader2 } from 'lucide-react';
import LivePreview from '@/components/admin/LivePreview';
import ExperiencePreview from '@/components/admin/previews/ExperiencePreview';
import SortableList from '@/components/admin/SortableList';
import SortableItem from '@/components/admin/SortableItem';

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

const defaultExperiences: Experience[] = [
  {
    id: '1',
    title: 'Diretor Escolar',
    company: 'Educação de Jovens e Adultos (EJA)',
    location: 'Brasil',
    period: 'Atual',
    type: 'Tempo Integral',
    description: [
      'Liderança de equipe pedagógica e administrativa com foco em resultados educacionais',
      'Implementação de projetos de inclusão digital para alunos adultos'
    ],
    highlights: ['Liderança', 'Gestão Estratégica', 'Impacto Social'],
    featured: true
  }
];

const AdminExperience = () => {
  const [experiences, setExperiences] = useState<Experience[]>(defaultExperiences);
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
        .eq('section_key', 'experience')
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data?.content && typeof data.content === 'object' && 'experiences' in (data.content as object)) {
        setExperiences((data.content as unknown as { experiences: Experience[] }).experiences || defaultExperiences);
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
        .eq('section_key', 'experience')
        .maybeSingle();

      let error;
      if (existing) {
        const result = await supabase
          .from('portfolio_content')
          .update({
            content: JSON.parse(JSON.stringify({ experiences })),
            updated_at: new Date().toISOString()
          })
          .eq('section_key', 'experience');
        error = result.error;
      } else {
        const result = await supabase
          .from('portfolio_content')
          .insert([{
            section_key: 'experience',
            content: JSON.parse(JSON.stringify({ experiences })),
            updated_at: new Date().toISOString()
          }]);
        error = result.error;
      }

      if (error) throw error;

      toast({
        title: 'Salvo!',
        description: 'Experiências atualizadas com sucesso.',
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

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      location: '',
      period: '',
      type: 'Tempo Integral',
      description: [''],
      highlights: [],
      featured: false
    };
    setExperiences([...experiences, newExp]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: unknown) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addDescription = (expId: string) => {
    setExperiences(experiences.map(exp => 
      exp.id === expId ? { ...exp, description: [...exp.description, ''] } : exp
    ));
  };

  const updateDescription = (expId: string, index: number, value: string) => {
    setExperiences(experiences.map(exp => {
      if (exp.id === expId) {
        const newDesc = [...exp.description];
        newDesc[index] = value;
        return { ...exp, description: newDesc };
      }
      return exp;
    }));
  };

  const removeDescription = (expId: string, index: number) => {
    setExperiences(experiences.map(exp => {
      if (exp.id === expId) {
        return { ...exp, description: exp.description.filter((_, i) => i !== index) };
      }
      return exp;
    }));
  };

  const updateHighlights = (expId: string, value: string) => {
    const highlights = value.split(',').map(h => h.trim()).filter(h => h);
    setExperiences(experiences.map(exp => 
      exp.id === expId ? { ...exp, highlights } : exp
    ));
  };

  if (isLoading) {
    return (
      <AdminLayout title="Experiências" description="Gerencie suas experiências profissionais">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Experiências" description="Gerencie suas experiências profissionais">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Editor */}
        <div className="space-y-6">
          <div className="flex justify-end">
            <Button onClick={addExperience} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Nova Experiência
            </Button>
          </div>

          <SortableList
            items={experiences}
            onReorder={setExperiences}
          >
            <div className="space-y-6">
              {experiences.map((exp, expIndex) => (
                <SortableItem key={exp.id} id={exp.id}>
                  <div className="glass-premium rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">
                        {exp.title || `Experiência ${expIndex + 1}`}
                      </h3>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={exp.featured}
                            onCheckedChange={(checked) => updateExperience(exp.id, 'featured', checked)}
                          />
                          <Label className="text-sm">Destaque</Label>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeExperience(exp.id)}
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label>Cargo</Label>
                        <Input
                          value={exp.title}
                          onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                          placeholder="Ex: Desenvolvedor Front-End"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Empresa</Label>
                        <Input
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          placeholder="Nome da empresa"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Localização</Label>
                        <Input
                          value={exp.location}
                          onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                          placeholder="Ex: São Paulo, Brasil"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Período</Label>
                        <Input
                          value={exp.period}
                          onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                          placeholder="Ex: 2022 - Atual"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Tipo</Label>
                        <Input
                          value={exp.type}
                          onChange={(e) => updateExperience(exp.id, 'type', e.target.value)}
                          placeholder="Ex: Tempo Integral"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Tags (separadas por vírgula)</Label>
                        <Input
                          value={exp.highlights.join(', ')}
                          onChange={(e) => updateHighlights(exp.id, e.target.value)}
                          placeholder="React, TypeScript, Liderança"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Descrição / Responsabilidades</Label>
                        <Button onClick={() => addDescription(exp.id)} variant="ghost" size="sm">
                          <Plus className="w-4 h-4 mr-1" />
                          Adicionar
                        </Button>
                      </div>
                      {exp.description.map((desc, descIndex) => (
                        <div key={descIndex} className="flex gap-2">
                          <Textarea
                            value={desc}
                            onChange={(e) => updateDescription(exp.id, descIndex, e.target.value)}
                            placeholder="Descreva uma responsabilidade ou conquista"
                            rows={2}
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeDescription(exp.id, descIndex)}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </SortableItem>
              ))}
            </div>
          </SortableList>

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
            <ExperiencePreview experiences={experiences} />
          </LivePreview>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminExperience;
