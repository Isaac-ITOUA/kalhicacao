import { Heart } from "lucide-react";
import logoKalhi from "@/assets/logo-kalhi.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <img src={logoKalhi} alt="KALHI" className="h-10 w-10 object-contain" />
              <span className="font-display font-bold text-xl">KALHI</span>
            </div>
            <p className="text-background/60 text-sm">
              © {new Date().getFullYear()} KALHI. Tous droits réservés.
            </p>
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-2 text-background/60 text-sm">
            <span>Fait avec</span>
            <Heart className="w-4 h-4 text-terracotta fill-terracotta" />
            <span>à Ouesso, Congo-Brazzaville</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
