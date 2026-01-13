import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    product: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <section id="contact" className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="animate-fade-in">
            <span className="inline-block px-4 py-1 bg-cream/20 text-cream rounded-full text-sm font-medium mb-4">
              Contact
            </span>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Passez Votre
              <span className="text-gold"> Commande</span>
            </h2>
            
            <p className="text-cream/80 mb-8 text-lg">
              Intéressé par nos produits ? Contactez-nous pour passer commande 
              ou obtenir plus d'informations sur notre cacao et nos œufs frais.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-cream/10 rounded-lg">
                  <MapPin className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-semibold">Localisation</h4>
                  <p className="text-cream/70">Ouesso, Congo-Brazzaville</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-cream/10 rounded-lg">
                  <Phone className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-semibold">Téléphone</h4>
                  <p className="text-cream/70">+242 XX XXX XXXX</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-cream/10 rounded-lg">
                  <Mail className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-cream/70">contact@cacao-ouesso.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card text-card-foreground rounded-2xl p-8 shadow-elevated animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-2xl font-display font-bold mb-6">
              Envoyez-nous un message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="product" className="block text-sm font-medium mb-2">
                  Produit d'intérêt
                </label>
                <select
                  id="product"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                >
                  <option value="">Sélectionnez un produit</option>
                  <option value="cacao">Cacao Premium</option>
                  <option value="eggs">Œufs Fermiers</option>
                  <option value="both">Les deux produits</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Votre message..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <Button variant="cacao" size="lg" className="w-full">
                <Send className="w-5 h-5 mr-2" />
                Envoyer le message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
