import cacaoImage from "@/assets/cacao-product.jpg";
import eggsImage from "@/assets/eggs-product.jpg";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Cacao Premium",
    description: "Fèves de cacao fraîches récoltées à la main dans notre plantation de 2 hectares. Idéal pour la production de chocolat artisanal.",
    image: cacaoImage,
    features: ["100% naturel", "Récolté à la main", "Séché au soleil"],
    badge: "Produit phare",
  },
  {
    id: 2,
    name: "Œufs Fermiers",
    description: "Œufs frais de nos poules élevées en plein air. Nos poules sont nourries naturellement pour des œufs de qualité supérieure.",
    image: eggsImage,
    features: ["Plein air", "Frais du jour", "Riche en protéines"],
    badge: "Fraîcheur garantie",
  },
];

const ProductsSection = () => {
  return (
    <section id="products" className="py-24 bg-gradient-warm">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Nos Produits
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            Produits de la Terre
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Des produits cultivés avec passion et respect des traditions agricoles congolaises.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Product Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-gold text-primary text-sm font-semibold rounded-full">
                    {product.badge}
                  </span>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6">
                <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                  {product.name}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {product.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <Button 
                  variant="cacao" 
                  className="w-full" 
                  size="lg"
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    contactSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Commander
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
