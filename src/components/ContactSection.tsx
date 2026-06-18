import { Mail, Phone, MapPin, Send, Package, Tag } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useSearchParams } from "react-router-dom";

const ContactSection = () => {
  const { get } = useSiteContent();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    message: "",
    productName: "",
    productGrade: "",
    productStandard: "",
  });
  const [sending, setSending] = useState(false);

  // Auto-fill from URL params when arriving from a product page
  useEffect(() => {
    const productName = searchParams.get("product") || "";
    const productGrade = searchParams.get("grade") || "";
    const productStandard = searchParams.get("standard") || "";
    if (productName || productGrade) {
      setForm((prev) => ({
        ...prev,
        productName,
        productGrade,
        productStandard,
        message: prev.message || buildDefaultMessage(productName, productGrade, productStandard),
      }));
    }
  }, [searchParams]);

  function buildDefaultMessage(name: string, grade: string, standard: string) {
    if (!name) return "";
    let msg = `I would like to request a quote for:\n\nProduct: ${name}`;
    if (grade) msg += `\nGrade: ${grade}`;
    if (standard) msg += `\nStandard: ${standard}`;
    msg += `\n\nPlease provide pricing, availability, and lead time.`;
    return msg;
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.email.trim() || !form.phone.trim() || !form.message.trim()) {
      toast({ title: "Missing fields", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast({ title: "Quote request sent!", description: "We'll get back to you within 24 hours." });
        setForm({ fullName: "", email: "", phone: "", companyName: "", message: "", productName: "", productGrade: "", productStandard: "" });
      } else {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Submission failed");
      }
    } catch (err: any) {
      // Fallback to email client if API unavailable
      const subject = encodeURIComponent(
        `${form.productName ? `Quote Request: ${form.productName}` : `Fastener Enquiry`} from ${form.fullName}${form.companyName ? ` (${form.companyName})` : ""}`
      );
      const body = encodeURIComponent(
        `Name: ${form.fullName}\nEmail: ${form.email}\nPhone: ${form.phone}\nCompany: ${form.companyName || "N/A"}\n\nMessage:\n${form.message}`
      );
      window.open(`mailto:${get("contact.email")}?subject=${subject}&body=${body}`, "_blank");
      toast({ title: "Opening email client", description: "Please send the pre-filled email from your email application." });
    } finally {
      setSending(false);
    }
  };

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const hasProductContext = form.productName || form.productGrade;

  return (
    <section id="contact" className="py-20 md:py-28 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-[0.3em] uppercase text-primary" data-testid="text-contact-eyebrow">{get("contact.eyebrow")}</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mt-3 text-foreground">
            <span data-testid="text-contact-title">{get("contact.title")}</span>{get("contact.titleAccent") && " "}{get("contact.titleAccent") && <span className="text-gradient-gold" data-testid="text-contact-title-accent">{get("contact.titleAccent")}</span>}
          </h2>
          <div className="gold-divider w-24 mx-auto mt-6" />
        </div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-6xl mx-auto">
          <div className="lg:col-span-2 space-y-5">
            <a href={`mailto:${get("contact.email")}`} data-testid="link-email" className="block bg-card rounded-lg border border-border p-6 shadow-elegant hover:border-primary/40 hover:shadow-gold transition">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-charcoal" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold text-foreground">Email</h3>
                  <p className="text-muted-foreground text-sm mt-1 break-all" data-testid="text-email">{get("contact.email")}</p>
                </div>
              </div>
            </a>
            <div className="bg-card rounded-lg border border-border p-6 shadow-elegant">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-charcoal" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold text-foreground">Phone</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {get("contact.phone1") && <a href={`tel:${get("contact.phone1").replace(/\s|\+/g, "")}`} className="hover:text-primary block" data-testid="link-phone-1">{get("contact.phone1")}</a>}
                    {get("contact.phone2") && <a href={`tel:${get("contact.phone2").replace(/\s|\+/g, "")}`} className="hover:text-primary block" data-testid="link-phone-2">{get("contact.phone2")}</a>}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-6 shadow-elegant">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-charcoal" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold text-foreground">Address</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-1 whitespace-pre-line" data-testid="text-address">
                    {get("contact.address")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="lg:col-span-3 bg-card rounded-lg border border-border p-6 md:p-8 shadow-elegant" data-testid="form-contact">
            <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
              {hasProductContext ? "Send Quote Request" : "Send Us a Message"}
            </h3>
            <p className="text-sm text-muted-foreground mb-6" data-testid="text-form-intro">{get("contact.formIntro")}</p>

            {/* Product context banner */}
            {hasProductContext && (
              <div className="mb-5 bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-start gap-3">
                <Package className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-foreground">Quote Request for:</div>
                  <div className="text-sm text-primary font-medium mt-0.5">{form.productName}</div>
                  <div className="flex flex-wrap gap-2 mt-1.5">
                    {form.productGrade && (
                      <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">
                        <Tag className="w-3 h-3" /> Grade: {form.productGrade}
                      </span>
                    )}
                    {form.productStandard && (
                      <span className="text-xs text-muted-foreground">{form.productStandard}</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Full Name *">
                <input value={form.fullName} onChange={update("fullName")} required data-testid="input-fullName" placeholder="John Smith" className="input-style" />
              </Field>
              <Field label="Email *">
                <input type="email" value={form.email} onChange={update("email")} required data-testid="input-email" placeholder="you@company.com" className="input-style" />
              </Field>
              <Field label="Phone Number *">
                <input value={form.phone} onChange={update("phone")} required data-testid="input-phone" placeholder="+91 98199 72301" className="input-style" />
              </Field>
              <Field label="Company Name">
                <input value={form.companyName} onChange={update("companyName")} data-testid="input-company" placeholder="Acme Pvt Ltd" className="input-style" />
              </Field>
            </div>

            <Field label="Message *" className="mt-4">
              <textarea
                value={form.message}
                onChange={update("message")}
                required
                rows={5}
                data-testid="input-message"
                placeholder="Describe your requirement: grade, size, quantity, delivery location…"
                className="input-style resize-none"
              />
            </Field>

            <button
              type="submit"
              disabled={sending}
              data-testid="button-submit-contact"
              className="mt-6 inline-flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3 rounded-md bg-gradient-gold text-charcoal font-semibold hover:opacity-90 transition disabled:opacity-60"
            >
              {sending ? "Sending…" : (<><Send className="w-4 h-4" /> {hasProductContext ? "Send Quote Request" : "Send Message"}</>)}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .input-style { width:100%; background: hsl(var(--background)); border: 1px solid hsl(var(--border)); border-radius: 0.5rem; padding: 0.65rem 0.85rem; font-size: 0.9rem; color: hsl(var(--foreground)); transition: border-color .2s, box-shadow .2s; }
        .input-style:focus { outline: none; border-color: hsl(var(--primary)); box-shadow: 0 0 0 3px hsl(var(--primary) / 0.15); }
      `}</style>
    </section>
  );
};

const Field = ({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) => (
  <label className={`block ${className}`}>
    <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">{label}</span>
    {children}
  </label>
);

export default ContactSection;
