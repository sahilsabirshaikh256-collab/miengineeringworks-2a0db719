import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-dark text-gold-light/80">
      <div className="container py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl font-bold text-gradient-gold mb-4">M.I. Engineering Works</h3>
            <p className="text-sm leading-relaxed text-gold-light/60">
              Trusted manufacturer and supplier of ASTM A193 Grade B7 fasteners for high-temperature and high-pressure service applications.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-gold-light mb-4">Our Products</h4>
            <ul className="space-y-2 text-sm text-gold-light/60">
              {["Stud Bolts", "Hex Bolts", "Heavy Hex Bolts", "Socket Head Cap Screws", "Eye Bolts", "U Bolts", "Anchor Bolts", "Threaded Rods"].map((p) => (
                <li key={p}><a href="#products" className="hover:text-gold transition-colors">{p}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-gold-light mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gold-light/60">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-gold/60" />
                <a href="mailto:mienginering17@gmail.com" className="hover:text-gold transition-colors">mienginering17@gmail.com</a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-gold/60" />
                <div>
                  <a href="tel:9819972301" className="hover:text-gold transition-colors block">+91 98199 72301</a>
                  <a href="tel:9137658733" className="hover:text-gold transition-colors block">+91 91376 58733</a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-gold/60 shrink-0" />
                <span>301, 01, Mehar Iron Bazar, Iron Market, Khedwadi, Girgaon, Mumbai – 400004</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gold/10">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between text-xs text-gold-light/40">
          <p>© {new Date().getFullYear()} M.I. Engineering Works. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
