import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminButton from "./AdminButton";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section
      const sections = ["sobre", "habilidades", "experiencia", "projetos", "contato"];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Sobre", href: "#sobre" },
    { label: "Habilidades", href: "#habilidades" },
    { label: "Experiência", href: "#experiencia" },
    { label: "Projetos", href: "#projetos" },
    { label: "Contato", href: "#contato" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass-premium py-3" : "py-5"
      }`}
    >
      <div className="container">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#" 
            className="group flex items-center gap-2 font-display font-bold text-2xl hover:text-primary transition-colors hoverable"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="relative">
              F<span className="text-primary">D</span>
              <Sparkles className="absolute -top-1 -right-3 w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 hoverable ${
                  activeSection === link.href.slice(1) 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA Button, Theme Toggle & Admin */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <AdminButton />
            <Button 
              variant="hero" 
              size="sm"
              onClick={() => scrollToSection("#contato")}
              className="hoverable"
            >
              <Sparkles className="w-4 h-4 mr-1" />
              Contato
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl glass-premium hover:bg-secondary/50 transition-colors hoverable"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 glass-premium border-t border-border animate-fade-in mt-2 mx-4 rounded-2xl overflow-hidden">
            <div className="p-6 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={`block w-full text-left px-4 py-3 rounded-xl transition-all ${
                    activeSection === link.href.slice(1)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <Button 
                variant="hero" 
                size="default" 
                className="w-full mt-4"
                onClick={() => scrollToSection("#contato")}
              >
                <Sparkles className="w-4 h-4 mr-1" />
                Contato
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
