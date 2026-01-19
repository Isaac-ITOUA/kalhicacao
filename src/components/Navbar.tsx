import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoKalhi from "@/assets/logo-kalhi.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const goToContact = () => {
    navigate("/contact");
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => navigate("/")} className="flex items-center gap-2">
            <img src={logoKalhi} alt="KALHI" className="h-10 w-10 object-contain" />
            <span
              className={`font-display font-bold text-xl transition-colors ${
                isScrolled ? "text-foreground" : "text-cream"
              }`}
            >
              KALHI
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("products")}
              className={`font-medium transition-colors hover:text-gold ${
                isScrolled ? "text-foreground" : "text-cream"
              }`}
            >
              Produits
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className={`font-medium transition-colors hover:text-gold ${
                isScrolled ? "text-foreground" : "text-cream"
              }`}
            >
              Notre Histoire
            </button>
            <button
              onClick={goToContact}
              className={`font-medium transition-colors hover:text-gold ${
                isScrolled ? "text-foreground" : "text-cream"
              }`}
            >
              Contact
            </button>
            <Button
              variant={isScrolled ? "cacao" : "hero"}
              size="default"
              onClick={goToContact}
            >
              Commander
            </Button>
            <Button
              variant="outline"
              size="default"
              onClick={() => navigate("/admin")}
              className={isScrolled ? "" : "border-cream/50 text-cream hover:bg-cream/10"}
            >
              Administrateurs
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 ${isScrolled ? "text-foreground" : "text-cream"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border/20 animate-fade-in">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("products")}
                className={`text-left font-medium py-2 ${
                  isScrolled ? "text-foreground" : "text-cream"
                }`}
              >
                Produits
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className={`text-left font-medium py-2 ${
                  isScrolled ? "text-foreground" : "text-cream"
                }`}
              >
                Notre Histoire
              </button>
              <button
                onClick={goToContact}
                className={`text-left font-medium py-2 ${
                  isScrolled ? "text-foreground" : "text-cream"
                }`}
              >
                Contact
              </button>
              <Button variant="cacao" onClick={goToContact}>
                Commander
              </Button>
              <Button variant="outline" onClick={() => navigate("/admin")}>
                Administrateurs
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
