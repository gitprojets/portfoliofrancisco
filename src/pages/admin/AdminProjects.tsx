import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Save, Plus, Trash2, Loader2, ExternalLink, Github } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import LivePreview from '@/components/admin/LivePreview';
import ProjectsPreview from '@/components/admin/previews/ProjectsPreview';
import SortableList from '@/components/admin/SortableList';
import SortableItem from '@/components/admin/SortableItem';

interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  results: string;
  image: string;
  github: string;
  live: string;
  featured: boolean;
}

const defaultProjects: Project[] = [
  {
    id: '1',
    title: 'Dashboard Analytics',
    description: 'Dashboard interativo para visualização de dados educacionais',
    problem: 'Necessidade de acompanhar métricas educacionais',
    solution: 'Interface moderna com React e gráficos interativos',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    results: 'Redução de 40% no tempo de análise de dados',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    github: 'https://github.com',
    live: '#',
    featured: true
  }
];

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
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
        .eq('section_key', 'projects')
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data?.content && typeof data.content === 'object' && 'projects' in (data.content as object)) {
        setProjects((data.content as unknown as { projects: Project[] }).projects || defaultProjects);
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
      // First check if record exists
      const { data: existing } = await supabase
        .from('portfolio_content')
        .select('id')
        .eq('section_key', 'projects')
        .maybeSingle();

      let error;
      if (existing) {
        const result = await supabase
          .from('portfolio_content')
          .update({
            content: JSON.parse(JSON.stringify({ projects })),
            updated_at: new Date().toISOString()
          })
          .eq('section_key', 'projects');
        error = result.error;
      } else {
        const result = await supabase
          .from('portfolio_content')
          .insert([{
            section_key: 'projects',
            content: JSON.parse(JSON.stringify({ projects })),
            updated_at: new Date().toISOString()
          }]);
        error = result.error;
      }

      if (error) throw error;

      toast({
        title: 'Salvo!',
        description: 'Projetos atualizados com sucesso.',
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

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: '',
      description: '',
      problem: '',
      solution: '',
      technologies: [],
      results: '',
      image: '',
      github: '',
      live: '',
      featured: false
    };
    setProjects([...projects, newProject]);
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: unknown) => {
    setProjects(projects.map(p =>
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const updateTechnologies = (id: string, value: string) => {
    const technologies = value.split(',').map(t => t.trim()).filter(t => t);
    setProjects(projects.map(p =>
      p.id === id ? { ...p, technologies } : p
    ));
  };

  if (isLoading) {
    return (
      <AdminLayout title="Projetos" description="Gerencie seus projetos do portfólio">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Projetos" description="Gerencie seus projetos do portfólio">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Editor */}
        <div className="space-y-6">
          <div className="flex justify-end">
            <Button onClick={addProject} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Novo Projeto
            </Button>
          </div>

          {projects.map((project, index) => (
            <div key={project.id} className="glass-premium rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">
                  {project.title || `Projeto ${index + 1}`}
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={project.featured}
                      onCheckedChange={(checked) => updateProject(project.id, 'featured', checked)}
                    />
                    <Label className="text-sm">Destaque</Label>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeProject(project.id)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Título</Label>
                    <Input
                      value={project.title}
                      onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                      placeholder="Nome do projeto"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Resultado</Label>
                    <Input
                      value={project.results}
                      onChange={(e) => updateProject(project.id, 'results', e.target.value)}
                      placeholder="Ex: Aumento de 40% em..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Descrição</Label>
                  <Textarea
                    value={project.description}
                    onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                    placeholder="Descreva o projeto..."
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Problema</Label>
                    <Textarea
                      value={project.problem}
                      onChange={(e) => updateProject(project.id, 'problem', e.target.value)}
                      placeholder="Qual problema o projeto resolve?"
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Solução</Label>
                    <Textarea
                      value={project.solution}
                      onChange={(e) => updateProject(project.id, 'solution', e.target.value)}
                      placeholder="Como o projeto resolve?"
                      rows={2}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tecnologias (separadas por vírgula)</Label>
                  <Input
                    value={project.technologies.join(', ')}
                    onChange={(e) => updateTechnologies(project.id, e.target.value)}
                    placeholder="React, TypeScript, Node.js"
                  />
                </div>

                {/* Imagem do Projeto */}
                <div className="space-y-2">
                  <Label>Imagem do Projeto</Label>
                  <ImageUpload
                    currentImage={project.image}
                    onImageChange={(url) => updateProject(project.id, 'image', url)}
                    folder={`project-${project.id}`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Github className="w-4 h-4" />
                      GitHub
                    </Label>
                    <Input
                      value={project.github}
                      onChange={(e) => updateProject(project.id, 'github', e.target.value)}
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Demo/Live
                    </Label>
                    <Input
                      value={project.live}
                      onChange={(e) => updateProject(project.id, 'live', e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

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
            <ProjectsPreview projects={projects} />
          </LivePreview>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProjects;
