import { Helmet } from "react-helmet-async";

const BRAND = "M.I. Engineering Works";
const SITE = "https://miengineeringworks.com";
const DEFAULT_OG = `${SITE}/og-default.jpg`;
const PHONE = "+91-9819972301";
const EMAIL = "miengineering17@gmail.com";

const DEFAULT_KEYWORDS = [
  "fasteners manufacturer Mumbai",
  "fasteners supplier India",
  "industrial fasteners Mumbai",
  "bolt manufacturer Mumbai",
  "nut manufacturer Mumbai",
  "stud bolt manufacturer India",
  "high tensile bolts",
  "stainless steel fasteners",
  "carbon steel fasteners",
  "alloy steel bolts",
  "MS bolts manufacturer",
  "SS bolts supplier",
  "brass fasteners India",
  "aluminium fasteners",
  "hex bolts Mumbai",
  "anchor bolts manufacturer",
  "foundation bolts supplier",
  "U bolts J bolts",
  "threaded rods India",
  "DIN ISO ASTM fasteners",
  "M.I. Engineering Works",
  "fastener manufacturer India",
  "buy fasteners online India",
  "fasteners wholesale Mumbai",
  "ASTM A193 fasteners",
  "fasteners for oil and gas",
  "fasteners for petrochemical",
  "fasteners for construction",
  "fasteners for power plant",
  "fasteners for aerospace",
  "fasteners for marine",
];

export interface BreadcrumbItem {
  name: string;
  path: string;
}

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  image?: string;
  type?: "website" | "article";
  productName?: string;
  productDescription?: string;
  breadcrumbs?: BreadcrumbItem[];
  googleVerification?: string;
  articleSchema?: {
    "@type": "TechArticle" | "Article" | "WebPage";
    headline: string;
    description: string;
    about?: string;
  };
}

export default function SEO({
  title,
  description,
  keywords = [],
  path = "",
  image = DEFAULT_OG,
  type = "website",
  productName,
  productDescription,
  breadcrumbs,
  googleVerification,
  articleSchema,
}: SEOProps) {
  const fullTitle = title.includes(BRAND) ? title : `${title} | ${BRAND}`;
  const url = `${SITE}${path}`;
  const allKeywords = [...new Set([...keywords, ...DEFAULT_KEYWORDS])].join(", ");

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": SITE,
    name: BRAND,
    url: SITE,
    logo: `${SITE}/logo.png`,
    image: `${SITE}/og-default.jpg`,
    description: "M.I. Engineering Works is a leading manufacturer and supplier of industrial fasteners in Mumbai, India. Specialising in high-tensile bolts, stainless steel fasteners, stud bolts, hex bolts, anchor bolts, nuts, and all types of DIN/ISO/ASTM fasteners.",
    telephone: PHONE,
    email: EMAIL,
    foundingDate: "2000",
    address: {
      "@type": "PostalAddress",
      streetAddress: "301, 01, Mehar Iron Bazar, Iron Market, Khedwadi, Girgaon",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400004",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "19.0760",
      longitude: "72.8777",
    },
    openingHours: "Mo-Sa 09:00-18:00",
    priceRange: "$$",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Bank Transfer, NEFT, RTGS",
    areaServed: ["India", "Mumbai", "Gujarat", "Rajasthan", "Tamil Nadu", "Andhra Pradesh"],
    hasMap: "https://maps.google.com/?q=Mumbai,Maharashtra,India",
    sameAs: [
      "https://www.linkedin.com/company/mi-engineering-works",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: PHONE,
        contactType: "Sales",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
      {
        "@type": "ContactPoint",
        telephone: PHONE,
        contactType: "Customer Service",
        contactOption: "TollFree",
        areaServed: "IN",
      },
    ],
  };

  const productSchema = productName
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: productName,
        description: productDescription || description,
        brand: {
          "@type": "Brand",
          name: BRAND,
        },
        manufacturer: {
          "@type": "Organization",
          name: BRAND,
          url: SITE,
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            name: BRAND,
          },
          areaServed: "IN",
        },
        url,
        image,
      }
    : null;

  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE,
          },
          ...breadcrumbs.map((b, i) => ({
            "@type": "ListItem",
            position: i + 2,
            name: b.name,
            item: `${SITE}${b.path}`,
          })),
        ],
      }
    : null;

  const articleJsonLd = articleSchema
    ? {
        "@context": "https://schema.org",
        "@type": articleSchema["@type"],
        headline: articleSchema.headline,
        description: articleSchema.description,
        about: articleSchema.about,
        url,
        image,
        author: {
          "@type": "Organization",
          name: BRAND,
          url: SITE,
        },
        publisher: {
          "@type": "Organization",
          name: BRAND,
          url: SITE,
          logo: {
            "@type": "ImageObject",
            url: `${SITE}/logo.png`,
          },
        },
        inLanguage: "en-IN",
        datePublished: "2024-01-01",
        dateModified: new Date().toISOString().split("T")[0],
      }
    : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content={BRAND} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={url} />

      {googleVerification && (
        <meta name="google-site-verification" content={googleVerification} />
      )}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={BRAND} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@miengineeringworks" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Local SEO */}
      <meta name="geo.region" content="IN-MH" />
      <meta name="geo.placename" content="Mumbai, Maharashtra, India" />
      <meta name="geo.position" content="19.0760;72.8777" />
      <meta name="ICBM" content="19.0760, 72.8777" />
      <meta name="theme-color" content="#8b5cf6" />

      {/* Business */}
      <meta name="contact" content={EMAIL} />
      <meta name="reply-to" content={EMAIL} />

      {/* JSON-LD: Organization / LocalBusiness */}
      <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>

      {/* JSON-LD: Product (for product pages) */}
      {productSchema && (
        <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
      )}

      {/* JSON-LD: BreadcrumbList */}
      {breadcrumbSchema && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      )}

      {/* JSON-LD: Article / TechArticle */}
      {articleJsonLd && (
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
      )}
    </Helmet>
  );
}
