import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
import { industriesData, productsData } from "@/data/staticData";
import { resolveImage } from "@/utils/resolveImage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";

const IndustryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const industry = industriesData.find((i) => i.slug === slug);
  const others = industriesData.filter((i) => i.slug !== slug).slice(0, 4);
  const recommendedProducts = industry?.recommendedProductSlugs
    ? productsData.filter((p) => industry.recommendedProductSlugs!.includes(p.slug))
    : [];

  if (!industry) {
    return (
      <PageTransition>
        <Header />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Industry Not Found</h1>
            <Link to="/applications" className="text-primary mt-4 inline-block">← Back to Applications</Link>
          </div>
        </div>
        <Footer />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <SEO
        title={`${industry.name} Fasteners Manufacturer & Supplier | M.I. Engineering Works`}
        description={`${industry.description.slice(0, 155)} — M.I. Engineering Works Mumbai, India.`}
        keywords={[
          `${industry.name} fasteners`,
          `${industry.name} fasteners manufacturer`,
          `${industry.name} fasteners supplier Mumbai`,
          `${industry.name} bolts nuts supplier India`,
          `fasteners for ${industry.name.toLowerCase()}`,
          `${industry.name} industry fasteners`,
          `${industry.name} bolts manufacturer India`,
          `${industry.name} fastener supplier`,
        ]}
        path={`/industry/${industry.slug}`}
        breadcrumbs={[
          { name: "Applications", path: "/applications" },
          { name: industry.name, path: `/industry/${industry.slug}` },
        ]}
        articleSchema={{
          "@type": "WebPage",
          headline: `${industry.name} Fasteners Manufacturer & Supplier`,
          description: industry.description.slice(0, 200),
          about: `Industrial fasteners for ${industry.name} applications — supplied by M.I. Engineering Works, Mumbai, India.`,
        }}
      />

      <Header />

      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img src={resolveImage("industry", industry.slug, industry.image)} alt={industry.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30" />
        <div className="container relative z-10 h-full flex flex-col justify-end pb-12 text-primary-foreground">
          <Link to="/applications" data-testid="link-back-applications" className="inline-flex items-center gap-1 text-primary mb-4 hover:underline w-fit">
            <ArrowLeft className="w-4 h-4" /> Back to Applications
          </Link>
          <span className="text-sm tracking-[0.3em] uppercase text-primary mb-2">Industry</span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold">{industry.name}</h1>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-background">
        <div className="container max-w-4xl">
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">{industry.heroDescription || industry.description}</p>
        </div>
      </section>

      {industry.grades?.length > 0 && (
        <section className="py-14 md:py-20 bg-secondary/20">
          <div className="container">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">Recommended Grades & Specifications</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {industry.grades.map((g, i) => (
                <div key={i} className="bg-card rounded-lg border border-border p-5">
                  <div className="font-heading text-lg font-bold text-gradient-gold mb-1">{g.grade}</div>
                  <div className="text-sm text-foreground/80 mb-1">{g.specification}</div>
                  <div className="text-xs text-muted-foreground">{g.usage}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {industry.keyRequirements?.length > 0 && (
        <section className="py-14 md:py-20 bg-background">
          <div className="container max-w-4xl">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">Key Requirements</h2>
            <ul className="space-y-3">
              {industry.keyRequirements.map((r, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground/80">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" /> {r}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {recommendedProducts.length > 0 && (
        <section className="py-14 md:py-20 bg-card/50">
          <div className="container">
            <div className="text-center mb-10">
              <span className="text-sm font-semibold tracking-[0.3em] uppercase text-primary">Recommended For This Industry</span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2">
                Suggested <span className="text-gradient-gold">Products</span>
              </h2>
              <div className="gold-divider w-20 mx-auto mt-3" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {recommendedProducts.map((p) => (
                <Link
                  key={p.slug}
                  to={`/product/${p.slug}`}
                  className="group bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 hover:shadow-gold transition-all duration-300"
                >
                  <div className="aspect-square bg-secondary/30 p-4 flex items-center justify-center">
                    <img
                      src={resolveImage("product", p.slug, p.image)}
                      alt={p.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3 border-t border-border text-center">
                    <div className="font-heading text-xs font-semibold text-foreground leading-tight">{p.name}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{p.standard}</div>
                    <span className="inline-flex items-center gap-1 text-primary text-[10px] font-medium mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      View Details <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section className="py-14 bg-secondary/20">
          <div className="container">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Other Industries</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {others.map((o) => (
                <Link key={o.slug} to={`/industry/${o.slug}`}
                  className="group relative rounded-lg overflow-hidden aspect-[4/3] shadow-md hover:shadow-gold transition">
                  <img src={o.image} alt={o.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="font-heading text-white text-xs font-semibold">{o.name}</h3>
                    <span className="inline-flex items-center gap-1 text-primary text-[10px] font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </PageTransition>
  );
};

export default IndustryDetail;
