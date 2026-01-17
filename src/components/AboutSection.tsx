import aboutImage from "@/assets/about-farm.jpg";
import { Leaf, Heart, Sun, Users } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Agriculture Naturelle",
    description: "Aucun pesticide ni engrais chimique",
  },
  {
    icon: Sun,
    title: "Séchage Traditionnel",
    description: "Méthodes ancestrales de séchage au soleil",
  },
  {
    icon: Heart,
    title: "Qualité Premium",
    description: "Sélection rigoureuse des meilleurs produits",
  },
  {
    icon: Users,
    title: "Commerce Équitable",
    description: "Soutien à l'économie locale",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <div className="relative animate-fade-in-left">
            <div className="relative rounded-2xl overflow-hidden shadow-elevated">
              <img
                src={aboutImage}
                alt="Notre équipe dans la plantation"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>
            
            {/* Stats Card */}
            <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-xl shadow-elevated border border-border">
              <div className="text-center">
                <span className="text-2xl font-display font-bold text-primary">Plusieurs</span>
                <span className="text-lg text-primary ml-1">ha</span>
                <p className="text-sm text-muted-foreground mt-1">de plantation</p>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:pl-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <span className="inline-block px-4 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
              Notre Histoire
            </span>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Une Passion Ancrée 
              <span className="text-secondary"> dans la Terre</span>
            </h2>
            
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Située au cœur de la forêt équatoriale à <strong className="text-foreground">Ouesso, Congo-Brazzaville</strong>, 
              notre exploitation familiale s'étend sur plusieurs hectares de cacaoyers et abrite un élevage de poules pondeuses.
            </p>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Nous cultivons notre cacao selon des méthodes traditionnelles, respectueuses de l'environnement 
              et transmises de génération en génération. Nos poules sont élevées en liberté, nourries 
              naturellement, garantissant des œufs d'une fraîcheur et d'une qualité incomparables.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{feature.title}</h4>
                    <p className="text-muted-foreground text-xs">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
