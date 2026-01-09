import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Save, Plus, Trash2, Loader2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import LivePreview from '@/components/admin/LivePreview';
import EducationPreview from '@/components/admin/previews/EducationPreview';
import SortableList from '@/components/admin/SortableList';
import SortableItem from '@/components/admin/SortableItem';

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
  certifications: { id: string; name: string }[];
}

const defaultContent: EducationContent = {
  education: [
    {
      id: '1',
      degree: 'Engenharia de Software',
      institution: 'Em andamento',
      status: 'Cursando',
      description: 'Formação completa em desenvolvimento de software, arquitetura de sistemas e metodologias ágeis.',
      progress: 60
    }
  ],
  certifications: [
    { id: '1', name: 'Desenvolvimento Front-End' },
    { id: '2', name: 'JavaScript Avançado' },
    { id: '3', name: 'React.js' }
  ]
};

// Helper to convert old format to new format
const migrateContent = (data: unknown): EducationContent => {
  const content = data as Record<string, unknown>;
  
  // Check if certifications is already in new format
  if (Array.isArray(content.certifications) && content.certifications.length > 0 && typeof content.certifications[0] === 'object') {
    return content as unknown as EducationContent;
  }
  
  // Migrate old format
  return {
    education: Array.isArray(content.education) ? content.education as Education[] : defaultContent.education,
    certifications: Array.isArray(content.certifications)
      ? content.certifications.map((name, i) => ({ id: String(i + 1), name: String(name) }))
      : defaultContent.certifications,
  };
};

const AdminEducation = () => {
  const [content, setContent] = useState<EducationContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [newCertification, setNewCertification] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_content')
        .select('content')
        .eq('section_key', 'education')
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data?.content) {
        setContent(migrateContent(data.content));
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
        .eq('section_key', 'education')
        .maybeSingle();

      let error;
      if (existing) {
        const result = await supabase
          .from('portfolio_content')
          .update({
            content: JSON.parse(JSON.stringify(content)),
            updated_at: new Date().toISOString()
          })
          .eq('section_key', 'education');
        error = result.error;
      } else {
        const result = await supabase
          .from('portfolio_content')
          .insert([{
            section_key: 'education',
            content: JSON.parse(JSON.stringify(content)),
            updated_at: new Date().toISOString()
          }]);
        error = result.error;
      }

      if (error) throw error;

      toast({
        title: 'Salvo!',
        description: 'Formação atualizada com sucesso.',
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

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      status: '',
      description: '',
      progress: 0
    };
    setContent({ ...content, education: [...content.education, newEdu] });
  };

  const removeEducation = (id: string) => {
    setContent({
      ...content,
      education: content.education.filter(edu => edu.id !== id)
    });
  };

  const updateEducation = (id: string, field: keyof Education, value: unknown) => {
    setContent({
      ...content,
      education: content.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  const addCertification = () => {
    if (newCertification.trim()) {
      setContent({
        ...content,
        certifications: [...content.certifications, { id: Date.now().toString(), name: newCertification.trim() }]
      });
      setNewCertification('');
    }
  };

  const removeCertification = (id: string) => {
    setContent({
      ...content,
      certifications: content.certifications.filter(c => c.id !== id)
    });
  };

  // Convert to preview format
  const previewContent = {
    education: content.education,
    certifications: content.certifications.map(c => c.name),
  };

  if (isLoading) {
    return (
      <AdminLayout title="Educação" description="Gerencie sua formação e certificações">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Educação" description="Gerencie sua formação e certificações">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Editor */}
        <div className="space-y-8">
          {/* Formações */}
          <div className="glass-premium rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Formações Acadêmicas</h2>
              <Button onClick={addEducation} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nova Formação
              </Button>
            </div>

            <SortableList
              items={content.education}
              onReorder={(education) => setContent({ ...content, education })}
            >
              <div className="space-y-6">
                {content.education.map((edu, index) => (
                  <SortableItem key={edu.id} id={edu.id}>
                    <div className="p-4 bg-secondary/30 rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{edu.degree || `Formação ${index + 1}`}</h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeEducation(edu.id)}
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Curso/Grau</Label>
                          <Input
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                            placeholder="Ex: Engenharia de Software"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Instituição</Label>
                          <Input
                            value={edu.institution}
                            onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                            placeholder="Nome da instituição"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Status</Label>
                          <Input
                            value={edu.status}
                            onChange={(e) => updateEducation(edu.id, 'status', e.target.value)}
                            placeholder="Ex: Cursando, Concluído"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Progresso: {edu.progress}%</Label>
                          <Slider
                            value={[edu.progress]}
                            onValueChange={(value) => updateEducation(edu.id, 'progress', value[0])}
                            max={100}
                            step={5}
                            className="mt-2"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Descrição</Label>
                        <Textarea
                          value={edu.description}
                          onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                          placeholder="Descreva os principais aprendizados..."
                          rows={2}
                        />
                      </div>
                    </div>
                  </SortableItem>
                ))}
              </div>
            </SortableList>
          </div>

          {/* Certificações */}
          <div className="glass-premium rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Certificações</h2>
            
            <div className="flex gap-2 mb-4">
              <Input
                value={newCertification}
                onChange={(e) => setNewCertification(e.target.value)}
                placeholder="Nome da certificação"
                onKeyDown={(e) => e.key === 'Enter' && addCertification()}
              />
              <Button onClick={addCertification} variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <SortableList
              items={content.certifications}
              onReorder={(certifications) => setContent({ ...content, certifications })}
            >
              <div className="flex flex-wrap gap-2">
                {content.certifications.map((cert) => (
                  <SortableItem key={cert.id} id={cert.id} className="inline-block">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-sm">
                      {cert.name}
                      <button
                        onClick={() => removeCertification(cert.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </span>
                  </SortableItem>
                ))}
              </div>
            </SortableList>
          </div>

          {/* Save Button */}
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
            <EducationPreview content={previewContent} />
          </LivePreview>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminEducation;
