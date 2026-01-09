import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import AdminAbout from "./pages/admin/AdminAbout";
import AdminExperience from "./pages/admin/AdminExperience";
import AdminEducation from "./pages/admin/AdminEducation";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminHero from "./pages/admin/AdminHero";
import AdminSkills from "./pages/admin/AdminSkills";
import AdminSoftSkills from "./pages/admin/AdminSoftSkills";
import AdminContact from "./pages/admin/AdminContact";
import AdminSocialLinks from "./pages/admin/AdminSocialLinks";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/about" element={<AdminAbout />} />
              <Route path="/admin/experience" element={<AdminExperience />} />
              <Route path="/admin/education" element={<AdminEducation />} />
              <Route path="/admin/projects" element={<AdminProjects />} />
              <Route path="/admin/hero" element={<AdminHero />} />
              <Route path="/admin/skills" element={<AdminSkills />} />
              <Route path="/admin/softskills" element={<AdminSoftSkills />} />
              <Route path="/admin/contact" element={<AdminContact />} />
              <Route path="/admin/social-links" element={<AdminSocialLinks />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
