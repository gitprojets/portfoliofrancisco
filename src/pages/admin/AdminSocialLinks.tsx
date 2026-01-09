import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Save, Plus, Trash2, GripVertical } from "lucide-react";
import { useSocialLinks, iconMap, type SocialLink } from "@/hooks/useSocialLinks";

const AdminSocialLinks = () => {
  const queryClient = useQueryClient();
  const { data: savedLinks, isLoading } = useSocialLinks();
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (savedLinks) {
      setLinks(savedLinks);
    }
  }, [savedLinks]);

  const handleAddLink = () => {
    setLinks([...links, { icon: "Mail", href: "", label: "" }]);
  };

  const handleRemoveLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleLinkChange = (index: number, field: keyof SocialLink, value: string) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setLinks(newLinks);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const contentData = JSON.parse(JSON.stringify({ links }));
      
      const { data: existing } = await supabase
        .from("portfolio_content")
        .select("id")
        .eq("section_key", "social-links")
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from("portfolio_content")
          .update({
            content: contentData,
            updated_at: new Date().toISOString()
          })
          .eq("section_key", "social-links");
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("portfolio_content")
          .insert({
            section_key: "social-links",
            content: contentData,
            updated_at: new Date().toISOString()
          });
        if (error) throw error;
      }
      
      queryClient.invalidateQueries({ queryKey: ["portfolio-content", "social-links"] });
      toast.success("Links sociais salvos com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toast.error("Erro ao salvar links sociais");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="Redes Sociais" description="Gerencie os links de redes sociais do portfólio">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Redes Sociais" description="Gerencie os links de redes sociais do portfólio">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>

        <div className="space-y-4">
          {links.map((link, index) => (
            <Card key={index}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                    <CardTitle className="text-lg">Link {index + 1}</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveLink(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Ícone</Label>
                  <Select
                    value={link.icon}
                    onValueChange={(value) => handleLinkChange(index, "icon", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um ícone" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(iconMap).map((iconName) => (
                        <SelectItem key={iconName} value={iconName}>
                          {iconName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Nome/Label</Label>
                  <Input
                    value={link.label}
                    onChange={(e) => handleLinkChange(index, "label", e.target.value)}
                    placeholder="Ex: LinkedIn"
                  />
                </div>
                <div className="space-y-2">
                  <Label>URL</Label>
                  <Input
                    value={link.href}
                    onChange={(e) => handleLinkChange(index, "href", e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button variant="outline" onClick={handleAddLink} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Link
        </Button>
      </div>
    </AdminLayout>
  );
};

export default AdminSocialLinks;
