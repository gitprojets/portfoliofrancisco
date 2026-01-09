import AdminLayout from '@/components/admin/AdminLayout';
import { Link } from 'react-router-dom';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  FolderOpen,
  Sparkles,
  Code2,
  Heart,
  Mail
} from 'lucide-react';

const Admin = () => {
  const menuItems = [
    { icon: Sparkles, label: 'Hero', href: '/admin/hero', description: 'Seção inicial com título e chamada para ação' },
    { icon: User, label: 'Sobre', href: '/admin/about', description: 'Informações pessoais, bio e destaques' },
    { icon: Code2, label: 'Skills', href: '/admin/skills', description: 'Habilidades técnicas e níveis de proficiência' },
    { icon: Briefcase, label: 'Experiências', href: '/admin/experience', description: 'Experiências profissionais' },
    { icon: GraduationCap, label: 'Educação', href: '/admin/education', description: 'Formações e certificações' },
    { icon: FolderOpen, label: 'Projetos', href: '/admin/projects', description: 'Portfólio de projetos realizados' },
    { icon: Heart, label: 'Soft Skills', href: '/admin/softskills', description: 'Habilidades interpessoais e liderança' },
    { icon: Mail, label: 'Contato', href: '/admin/contact', description: 'Informações de contato e oportunidades' },
  ];

  return (
    <AdminLayout title="Dashboard" description="Bem-vindo à área administrativa do seu portfólio.">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="glass-premium rounded-xl p-6 hover-lift group"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
              <item.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
              {item.label}
            </h3>
            <p className="text-sm text-muted-foreground">
              {item.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-8 glass-premium rounded-xl p-6 max-w-6xl">
        <h2 className="text-xl font-semibold mb-4">Instruções</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Use o menu lateral ou os cards acima para navegar entre as seções</li>
          <li>• Todas as alterações são salvas no banco de dados automaticamente</li>
          <li>• Clique em "Ver Portfólio" para visualizar as mudanças em tempo real</li>
          <li>• Apenas administradores têm acesso a esta área</li>
        </ul>
      </div>
    </AdminLayout>
  );
};

export default Admin;
