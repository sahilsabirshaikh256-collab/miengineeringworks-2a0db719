import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";

const Footer = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://formsubmit.co/ajax/mienginering17@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          _subject: `New Enquiry from ${formData.name} - M.I. Engineering Works`,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setError("Failed to send message. Please try again.");
      }
    } catch {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gradient-dark text-gold-light/80">
      {/* Contact Form + Map Row */}
      <div className="container py-16">
        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          {/* Contact Form */}
          <div className="bg-[hsl(30,10%,16%)] rounded-xl border border-[hsl(43,72%,48%,0.15)] p-8">
            <h3 className="font-heading text-2xl font-bold text-gradient-gold mb-2">Send Us a Message</h3>
            <p className="text-sm text-gold-light/50 mb-6">Fill in the details below and we'll get back to you promptly.</p>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle2 className="w-16 h-16 text-primary mb-4" />
                <h4 className="font-heading text-xl font-bold text-gold-light mb-2">Thank You!</h4>
                <p className="text-sm text-gold-light/60">Your mail client has been opened. Please send the email to complete your enquiry.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gold-light/70 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full bg-[hsl(30,10%,12%)] border border-[hsl(43,72%,48%,0.2)] rounded-lg px-4 py-2.5 text-sm text-gold-light placeholder:text-gold-light/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gold-light/70 mb-1.5">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full bg-[hsl(30,10%,12%)] border border-[hsl(43,72%,48%,0.2)] rounded-lg px-4 py-2.5 text-sm text-gold-light placeholder:text-gold-light/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gold-light/70 mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-[hsl(30,10%,12%)] border border-[hsl(43,72%,48%,0.2)] rounded-lg px-4 py-2.5 text-sm text-gold-light placeholder:text-gold-light/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gold-light/70 mb-1.5">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your requirements (product, size, quantity, grade...)"
                    className="w-full bg-[hsl(30,10%,12%)] border border-[hsl(43,72%,48%,0.2)] rounded-lg px-4 py-2.5 text-sm text-gold-light placeholder:text-gold-light/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground font-semibold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity shadow-gold text-sm"
                >
                  <Send className="w-4 h-4" /> Send Enquiry
                </button>
              </form>
            )}
          </div>

          {/* Google Map */}
          <div className="rounded-xl overflow-hidden border border-[hsl(43,72%,48%,0.15)]">
            <iframe
              title="M.I. Engineering Works Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.0!2d72.8185!3d18.9567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce1a5e1b5555%3A0x1234567890abcdef!2sKhedwadi%2C%20Girgaon%2C%20Mumbai%2C%20Maharashtra%20400004!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Footer Columns */}
        <div className="grid md:grid-cols-3 gap-12 border-t border-[hsl(43,72%,48%,0.1)] pt-12">
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
              {products.slice(0, 8).map((p) => (
                <li key={p.slug}>
                  <Link to={`/product/${p.slug}`} className="hover:text-primary transition-colors">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-gold-light mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gold-light/60">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-primary/60" />
                <a href="mailto:mienginering17@gmail.com" className="hover:text-primary transition-colors">mienginering17@gmail.com</a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-primary/60" />
                <div>
                  <a href="tel:9819972301" className="hover:text-primary transition-colors block">+91 98199 72301</a>
                  <a href="tel:9137658733" className="hover:text-primary transition-colors block">+91 91376 58733</a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-primary/60 shrink-0" />
                <span>301, 01, Mehar Iron Bazar, Iron Market, Khedwadi, Girgaon, Mumbai – 400004</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[hsl(43,72%,48%,0.1)]">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between text-xs text-gold-light/40">
          <p>© {new Date().getFullYear()} M.I. Engineering Works. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
