import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminButton = () => {
  const { user, isAdmin, isLoading } = useAuth();

  if (isLoading || !user) return null;

  if (isAdmin) {
    return (
      <Link to="/admin">
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-primary hover:text-primary hover:bg-primary/10"
        >
          <Shield className="w-4 h-4" />
          <span className="hidden sm:inline">Admin</span>
        </Button>
      </Link>
    );
  }

  return null;
};

export default AdminButton;
