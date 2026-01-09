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
import AboutPreview from '@/components/admin/previews/AboutPreview';
import SortableList from '@/components/admin/SortableList';
import SortableItem from '@/components/admin/SortableItem';

interface AboutContent {
  name: string;
  fullName: string;
  bio: { id: string; text: string }[];
  stats: { id: string; value: string; label: string }[];
  highlights: { id: string; title: string; description: string }[];
}

const defaultContent: AboutContent = {
  name: 'Francisco Douglas',
  fullName: 'de Sousa Beserra',
  bio: [
    { id: '1', text: 'Sou um profissional em constante evolução, com uma trajetória que conecta tecnologia, educação e gestão.' },
    { id: '2', text: 'Atualmente, atuo como Diretor Escolar na Educação de Jovens e Adultos (EJA), liderando equipes e transformando vidas através da educação inclusiva.' },
    { id: '3', text: 'Acredito que a tecnologia é uma ferramenta poderosa para democratizar oportunidades e criar impacto positivo na sociedade.' }
  ],
  stats: [
    { id: '1', value: '5+', label: 'Anos de Experiência' },
    { id: '2', value: '20+', label: 'Projetos Realizados' },
    { id: '3', value: '100+', label: 'Vidas Impactadas' }
  ],
  highlights: [
    { id: '1', title: 'Tecnologia', description: 'Apaixonado por criar soluções digitais que fazem a diferença' },
    { id: '2', title: 'Educação', description: 'Compromisso com a transformação através do ensino' },
    { id: '3', title: 'Gestão', description: 'Liderança humanizada focada em resultados' },
    { id: '4', title: 'Propósito', description: 'Impacto social e inclusão como valores fundamentais' }
  ]
};

// Helper to convert old format to new format
const migrateContent = (data: unknown): AboutContent => {
  const content = data as Record<string, unknown>;
  
  // Check if bio is already in new format
  if (Array.isArray(content.bio) && content.bio.length > 0 && typeof content.bio[0] === 'object') {
    return content as unknown as AboutContent;
  }
  
  // Migrate old format
  return {
    name: (content.name as string) || defaultContent.name,
    fullName: (content.fullName as string) || defaultContent.fullName,
    bio: Array.isArray(content.bio) 
      ? content.bio.map((text, i) => ({ id: String(i + 1), text: String(text) }))
      : defaultContent.bio,
    stats: Array.isArray(content.stats)
      ? content.stats.map((s, i) => ({ id: String(i + 1), ...(s as { value: string; label: string }) }))
      : defaultContent.stats,
    highlights: Array.isArray(content.highlights)
      ? content.highlights.map((h, i) => ({ id: String(i + 1), ...(h as { title: string; description: string }) }))
      : defaultContent.highlights,
  };
};

const AdminAbout = () => {
  const [content, setContent] = useState<AboutContent>(defaultContent);
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
        .eq('section_key', 'about')
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
        .eq('section_key', 'about')
        .maybeSingle();

      let error;
      if (existing) {
        const result = await supabase
          .from('portfolio_content')
          .update({
            content: JSON.parse(JSON.stringify(content)),
            updated_at: new Date().toISOString()
          })
          .eq('section_key', 'about');
        error = result.error;
      } else {
        const result = await supabase
          .from('portfolio_content')
          .insert([{
            section_key: 'about',
            content: JSON.parse(JSON.stringify(content)),
            updated_at: new Date().toISOString()
          }]);
        error = result.error;
      }

      if (error) throw error;

      toast({
        title: 'Salvo!',
        description: 'Conteúdo atualizado com sucesso.',
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

  const updateBio = (id: string, value: string) => {
    setContent({
      ...content,
      bio: content.bio.map(b => b.id === id ? { ...b, text: value } : b)
    });
  };

  const addBio = () => {
    setContent({
      ...content,
      bio: [...content.bio, { id: Date.now().toString(), text: '' }]
    });
  };

  const removeBio = (id: string) => {
    setContent({
      ...content,
      bio: content.bio.filter(b => b.id !== id)
    });
  };

  const updateStat = (id: string, field: 'value' | 'label', value: string) => {
    setContent({
      ...content,
      stats: content.stats.map(s => s.id === id ? { ...s, [field]: value } : s)
    });
  };

  const addStat = () => {
    setContent({
      ...content,
      stats: [...content.stats, { id: Date.now().toString(), value: '', label: '' }]
    });
  };

  const removeStat = (id: string) => {
    setContent({
      ...content,
      stats: content.stats.filter(s => s.id !== id)
    });
  };

  const updateHighlight = (id: string, field: 'title' | 'description', value: string) => {
    setContent({
      ...content,
      highlights: content.highlights.map(h => h.id === id ? { ...h, [field]: value } : h)
    });
  };

  const addHighlight = () => {
    setContent({
      ...content,
      highlights: [...content.highlights, { id: Date.now().toString(), title: '', description: '' }]
    });
  };

  const removeHighlight = (id: string) => {
    setContent({
      ...content,
      highlights: content.highlights.filter(h => h.id !== id)
    });
  };

  // Convert to preview format
  const previewContent = {
    name: content.name,
    fullName: content.fullName,
    bio: content.bio.map(b => b.text),
    stats: content.stats.map(s => ({ value: s.value, label: s.label })),
    highlights: content.highlights.map(h => ({ title: h.title, description: h.description })),
  };

  if (isLoading) {
    return (
      <AdminLayout title="Sobre" description="Edite as informações da seção Sobre">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Sobre" description="Edite as informações da seção Sobre">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Editor */}
        <div className="space-y-8">
          {/* Nome */}
          <div className="glass-premium rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Informações Básicas</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome</Label>
                <Input
                  value={content.name}
                  onChange={(e) => setContent({ ...content, name: e.target.value })}
                  placeholder="Primeiro nome"
                />
              </div>
              <div className="space-y-2">
                <Label>Nome Completo</Label>
                <Input
                  value={content.fullName}
                  onChange={(e) => setContent({ ...content, fullName: e.target.value })}
                  placeholder="Sobrenome"
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="glass-premium rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Biografia</h2>
              <Button onClick={addBio} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Parágrafo
              </Button>
            </div>
            <SortableList
              items={content.bio}
              onReorder={(bio) => setContent({ ...content, bio })}
            >
              <div className="space-y-4">
                {content.bio.map((paragraph) => (
                  <SortableItem key={paragraph.id} id={paragraph.id}>
                    <div className="flex gap-2">
                      <Textarea
                        value={paragraph.text}
                        onChange={(e) => updateBio(paragraph.id, e.target.value)}
                        placeholder="Parágrafo..."
                        rows={3}
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeBio(paragraph.id)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </SortableItem>
                ))}
              </div>
            </SortableList>
          </div>

          {/* Stats */}
          <div className="glass-premium rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Estatísticas</h2>
              <Button onClick={addStat} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </div>
            <SortableList
              items={content.stats}
              onReorder={(stats) => setContent({ ...content, stats })}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {content.stats.map((stat) => (
                  <SortableItem key={stat.id} id={stat.id}>
                    <div className="p-4 bg-secondary/30 rounded-lg space-y-3">
                      <Input
                        value={stat.value}
                        onChange={(e) => updateStat(stat.id, 'value', e.target.value)}
                        placeholder="Ex: 5+"
                        className="text-center font-bold"
                      />
                      <Input
                        value={stat.label}
                        onChange={(e) => updateStat(stat.id, 'label', e.target.value)}
                        placeholder="Ex: Anos de Experiência"
                        className="text-center text-sm"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeStat(stat.id)}
                        className="w-full text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </SortableItem>
                ))}
              </div>
            </SortableList>
          </div>

          {/* Highlights */}
          <div className="glass-premium rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Destaques</h2>
              <Button onClick={addHighlight} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </div>
            <SortableList
              items={content.highlights}
              onReorder={(highlights) => setContent({ ...content, highlights })}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.highlights.map((highlight) => (
                  <SortableItem key={highlight.id} id={highlight.id}>
                    <div className="p-4 bg-secondary/30 rounded-lg space-y-3">
                      <Input
                        value={highlight.title}
                        onChange={(e) => updateHighlight(highlight.id, 'title', e.target.value)}
                        placeholder="Título"
                      />
                      <Textarea
                        value={highlight.description}
                        onChange={(e) => updateHighlight(highlight.id, 'description', e.target.value)}
                        placeholder="Descrição"
                        rows={2}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeHighlight(highlight.id)}
                        className="w-full text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
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
            <AboutPreview content={previewContent} />
          </LivePreview>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAbout;
