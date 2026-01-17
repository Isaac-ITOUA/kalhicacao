import heroImage from "@/assets/hero-cacao.jpg";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Plantation de cacao à Ouesso"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block mb-6 px-4 py-2 bg-gold/20 backdrop-blur-sm rounded-full text-cream text-sm font-medium animate-fade-in border border-gold/30">
            🌿 Depuis Ouesso, Congo-Brazzaville
          </span>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-cream mb-6 leading-tight animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Cacao d'Exception
            <br />
            <span className="text-gold">& Œufs Fermiers</span>
          </h1>
          
          <p className="text-lg md:text-xl text-cream/90 mb-10 max-w-2xl mx-auto font-body animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Découvrez les saveurs authentiques de nos plusieurs hectares de cacao 
            et nos œufs frais issus de notre élevage traditionnel.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Button variant="hero" size="xl" onClick={scrollToProducts}>
              Découvrir nos produits
            </Button>
            <Button variant="outline" size="xl" className="border-cream text-cream hover:bg-cream hover:text-primary">
              Nous contacter
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <button 
          onClick={scrollToProducts}
          className="flex flex-col items-center text-cream/70 hover:text-cream transition-colors"
        >
          <span className="text-sm mb-2">Défiler</span>
          <ArrowDown className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
