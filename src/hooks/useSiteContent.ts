export type SiteContentMap = Record<string, string>;

export const SITE_CONTENT_DEFAULTS: SiteContentMap = {
  "brand.name": "M.I. Engineering Works",
  "brand.tagline": "Premium Fastener Solutions",
  "brand.logo": "",
  "brand.favicon": "",
  "company.gst": "27CBFPM8207D1ZR",
  "socials.json": JSON.stringify([
    { label: "Email", url: "mailto:miengineering17@gmail.com", icon: "mail" },
    { label: "Google Business Profile", url: "https://share.google/yGOyNRcx1ToTGVGK7", icon: "globe" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/mi-engineering-21a878402/", icon: "linkedin" },
    { label: "X (Twitter)", url: "https://x.com/Engineerin86903", icon: "twitter" },
    { label: "Facebook", url: "https://www.facebook.com/profile.php?id=61587684155116", icon: "facebook" },
    { label: "WhatsApp", url: "https://wa.me/919819972301", icon: "whatsapp" },
  ]),
  "animations.product": "lift",
  "animations.background": "none",
  "hero.eyebrow": "",
  "hero.title": "All Types of",
  "hero.titleAccent": "Industrial Fasteners",
  "hero.subtitle": "M.I. Engineering Works — trusted manufacturer & supplier of all types of industrial fasteners including bolts, nuts, screws, stud bolts, threaded rods, washers, flanges, pipe fittings & more. Based in Mumbai, India.",
  "hero.ctaPrimaryText": "View Products",
  "hero.ctaPrimaryUrl": "#products",
  "hero.ctaSecondaryText": "Get a Quote",
  "hero.ctaSecondaryUrl": "#contact",
  "about.eyebrow": "About Us",
  "about.title": "M.I. Engineering",
  "about.titleAccent": "Works",
  "about.body1": "M.I. Engineering Works is a leading manufacturer and supplier of all types of industrial fasteners based in Mumbai, India. With over 25 years of expertise, we supply stud bolts, hex bolts, threaded rods, anchor bolts, nuts, washers, flanges, pipe fittings and specialty fasteners to oil refineries, petrochemical plants, power stations, and EPC contractors across India and the Middle East.",
  "about.body2": "Our state-of-the-art manufacturing facility is equipped with CNC turning, precision threading, and heat treatment capabilities. Every fastener undergoes rigorous quality inspection with full material test certificates (MTCs) per EN 10204 Type 3.1.",
  "stats.eyebrow": "Our Track Record",
  "stats.title": "Numbers That",
  "stats.titleAccent": "Speak",
  "stats.years": "25",
  "stats.yearsLabel": "Years Experience",
  "stats.clients": "500",
  "stats.clientsLabel": "Happy Clients",
  "stats.orders": "10000",
  "stats.ordersLabel": "Orders Delivered",
  "stats.industries": "12",
  "stats.industriesLabel": "Industries Served",
  "contact.eyebrow": "Get In Touch",
  "contact.title": "Contact",
  "contact.titleAccent": "Us",
  "contact.email": "miengineering17@gmail.com",
  "contact.phone1": "+91 98199 72301",
  "contact.phone2": "+91 91376 58733",
  "contact.address": "301, 01, Mehar Iron Bazar, Iron Market, Khedwadi, Girgaon, Mumbai – 400004",
  "contact.formIntro": "Tell us about your fastener requirements — we typically respond within 24 hours.",
};

export function useSiteContent() {
  const get = (key: string, fallback?: string) =>
    (SITE_CONTENT_DEFAULTS[key] ?? fallback ?? "").toString();

  return { content: SITE_CONTENT_DEFAULTS, get };
}
