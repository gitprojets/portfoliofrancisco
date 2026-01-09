import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Save, Plus, Trash2, Loader2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import LivePreview from '@/components/admin/LivePreview';
import SkillsPreview from '@/components/admin/previews/SkillsPreview';
import SortableList from '@/components/admin/SortableList';
import SortableItem from '@/components/admin/SortableItem';

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

const defaultCategories: SkillCategory[] = [
  {
    id: '1',
    title: "Linguagens & Frameworks",
    icon: "💻",
    skills: [
      { name: "JavaScript", level: 85 },
      { name: "TypeScript", level: 75 },
      { name: "React", level: 80 },
    ]
  },
];

const AdminSkills = () => {
  const [categories, setCategories] = useState<SkillCategory[]>(defaultCategories);
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
        .eq('section_key', 'skills')
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data?.content && typeof data.content === 'object' && 'categories' in (data.content as object)) {
        setCategories((data.content as unknown as { categories: SkillCategory[] }).categories);
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
        .eq('section_key', 'skills')
        .maybeSingle();

      let error;
      if (existing) {
        const result = await supabase
          .from('portfolio_content')
          .update({
            content: JSON.parse(JSON.stringify({ categories })),
            updated_at: new Date().toISOString()
          })
          .eq('section_key', 'skills');
        error = result.error;
      } else {
        const result = await supabase
          .from('portfolio_content')
          .insert([{
            section_key: 'skills',
            content: JSON.parse(JSON.stringify({ categories })),
            updated_at: new Date().toISOString()
          }]);
        error = result.error;
      }

      if (error) throw error;

      toast({
        title: 'Salvo!',
        description: 'Skills atualizadas com sucesso.',
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

  const addCategory = () => {
    setCategories([...categories, {
      id: Date.now().toString(),
      title: '',
      icon: '📁',
      skills: []
    }]);
  };

  const removeCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  const updateCategory = (id: string, field: keyof SkillCategory, value: unknown) => {
    setCategories(categories.map(c =>
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const addSkill = (categoryId: string) => {
    setCategories(categories.map(c =>
      c.id === categoryId
        ? { ...c, skills: [...c.skills, { name: '', level: 50 }] }
        : c
    ));
  };

  const removeSkill = (categoryId: string, skillIndex: number) => {
    setCategories(categories.map(c =>
      c.id === categoryId
        ? { ...c, skills: c.skills.filter((_, i) => i !== skillIndex) }
        : c
    ));
  };

  const updateSkill = (categoryId: string, skillIndex: number, field: keyof Skill, value: unknown) => {
    setCategories(categories.map(c =>
      c.id === categoryId
        ? {
            ...c,
            skills: c.skills.map((s, i) =>
              i === skillIndex ? { ...s, [field]: value } : s
            )
          }
        : c
    ));
  };

  if (isLoading) {
    return (
      <AdminLayout title="Skills" description="Gerencie suas habilidades técnicas">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Skills" description="Gerencie suas habilidades técnicas">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Editor */}
        <div className="space-y-6">
          <div className="flex justify-end">
            <Button onClick={addCategory} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Nova Categoria
            </Button>
          </div>

          <SortableList items={categories} onReorder={setCategories}>
            <div className="space-y-6">
              {categories.map((category) => (
                <SortableItem key={category.id} id={category.id}>
                  <div className="glass-premium rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4 flex-1">
                        <Input
                          value={category.icon}
                          onChange={(e) => updateCategory(category.id, 'icon', e.target.value)}
                          className="w-16 text-center text-2xl"
                          maxLength={2}
                        />
                        <Input
                          value={category.title}
                          onChange={(e) => updateCategory(category.id, 'title', e.target.value)}
                          placeholder="Nome da categoria"
                          className="flex-1"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeCategory(category.id)}
                        className="text-destructive hover:bg-destructive/10 ml-4"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg">
                          <Input
                            value={skill.name}
                            onChange={(e) => updateSkill(category.id, skillIndex, 'name', e.target.value)}
                            placeholder="Nome da skill"
                            className="flex-1"
                          />
                          <div className="flex items-center gap-3 w-48">
                            <Slider
                              value={[skill.level]}
                              onValueChange={([value]) => updateSkill(category.id, skillIndex, 'level', value)}
                              max={100}
                              step={5}
                              className="flex-1"
                            />
                            <span className="text-sm font-mono w-12 text-right">{skill.level}%</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSkill(category.id, skillIndex)}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addSkill(category.id)}
                        className="w-full"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Skill
                      </Button>
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
            <SkillsPreview categories={categories} />
          </LivePreview>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSkills;
