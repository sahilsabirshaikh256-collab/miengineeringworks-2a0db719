import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, CheckCircle2, Image as ImageIcon, RotateCcw, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { productsData, industriesData, standardsData } from "@/data/staticData";
import { saveImageOverride, getAllOverrides } from "@/utils/resolveImage";

type Tab = "products" | "applications" | "standards";

const CATEGORIES = Array.from(new Set(productsData.map((p) => p.category)));

const ImageRow = ({
  type,
  slug,
  name,
  defaultImage,
  overrides,
  onSave,
}: {
  type: "product" | "industry" | "standard";
  slug: string;
  name: string;
  defaultImage: string;
  overrides: Record<string, string>;
  onSave: (type: "product" | "industry" | "standard", slug: string, url: string) => void;
}) => {
  const key = `${type}:${slug}`;
  const currentOverride = overrides[key] || "";
  const [url, setUrl] = useState(currentOverride);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setUrl(overrides[key] || "");
  }, [overrides, key]);

  const displayImage = url || currentOverride || defaultImage;

  const handleSave = () => {
    saveImageOverride(type, slug, url);
    onSave(type, slug, url);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setUrl("");
    saveImageOverride(type, slug, "");
    onSave(type, slug, "");
  };

  return (
    <div className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border hover:border-primary/30 transition">
      <div className="w-20 h-20 rounded-md overflow-hidden bg-secondary/40 flex-shrink-0">
        <img
          src={displayImage}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://placehold.co/80x80?text=No+Image";
          }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-foreground text-sm mb-1 truncate">{name}</div>
        <div className="text-[10px] text-muted-foreground font-mono mb-2 truncate">{slug}</div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <ImageIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste image URL here…"
              className="w-full pl-8 pr-3 py-2 text-xs rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition"
            />
          </div>
          <button
            onClick={handleSave}
            className={`flex items-center gap-1 px-3 py-2 rounded-md text-xs font-semibold transition ${
              saved
                ? "bg-green-600 text-white"
                : "bg-gradient-gold text-charcoal hover:opacity-90"
            }`}
          >
            {saved ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            {saved ? "Saved!" : "Save"}
          </button>
          {(currentOverride || url) && (
            <button
              onClick={handleReset}
              title="Reset to default"
              className="p-2 rounded-md border border-border text-muted-foreground hover:text-destructive hover:border-destructive transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        {currentOverride && (
          <div className="mt-1 text-[10px] text-primary truncate">
            ✓ Custom image set
          </div>
        )}
      </div>
    </div>
  );
};

export default function ImageEditorPage() {
  const [tab, setTab] = useState<Tab>("products");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [overrides, setOverrides] = useState<Record<string, string>>(getAllOverrides);
  const [search, setSearch] = useState("");

  const handleSave = (_type: string, _slug: string, _url: string) => {
    setOverrides(getAllOverrides());
  };

  const productsByCategory =
    selectedCategory === "All"
      ? productsData
      : productsData.filter((p) => p.category === selectedCategory);

  const filteredProducts = productsByCategory.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  const filteredIndustries = industriesData.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );
  const filteredStandards = standardsData.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.code.toLowerCase().includes(search.toLowerCase())
  );

  const overrideCount = Object.keys(overrides).length;

  return (
    <PageTransition>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Hero */}
        <div className="bg-gradient-dark border-b border-primary/10 py-12 md:py-16">
          <div className="container">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-primary">Site Management</span>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-gold-light mt-2">Image Editor</h1>
            <p className="text-sm text-gold-light/60 mt-2 max-w-2xl">
              Paste any image URL to replace the default image for products, applications, or standards.
              Changes are saved instantly to your browser and reflected across the site immediately on refresh.
            </p>
            {overrideCount > 0 && (
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {overrideCount} custom {overrideCount === 1 ? "image" : "images"} saved
              </div>
            )}
          </div>
        </div>

        <div className="container py-8">
          {/* Search */}
          <div className="relative mb-6 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name…"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-border pb-4">
            {(["products", "applications", "standards"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setSearch(""); }}
                className={`px-4 py-2 rounded-md text-sm font-semibold capitalize transition ${
                  tab === t
                    ? "bg-gradient-gold text-charcoal"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {t === "products"
                  ? `Products (${productsData.length})`
                  : t === "applications"
                  ? `Applications (${industriesData.length})`
                  : `Standards (${standardsData.length})`}
              </button>
            ))}
          </div>

          {/* Products Tab */}
          {tab === "products" && (
            <div>
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                {["All", ...CATEGORIES].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                      selectedCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                    }`}
                  >
                    {cat}
                    {cat !== "All" && (
                      <span className="ml-1 opacity-60">
                        ({productsData.filter((p) => p.category === cat).length})
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {CATEGORIES.filter((cat) =>
                selectedCategory === "All" || cat === selectedCategory
              ).map((cat) => {
                const items = filteredProducts.filter((p) => p.category === cat);
                if (items.length === 0) return null;
                return (
                  <motion.div
                    key={cat}
                    className="mb-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="font-heading text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                      {cat}
                      <span className="text-xs text-muted-foreground font-normal">({items.length} items)</span>
                    </h2>
                    <div className="grid md:grid-cols-2 gap-3">
                      {items.map((p) => (
                        <ImageRow
                          key={p.slug}
                          type="product"
                          slug={p.slug}
                          name={p.name}
                          defaultImage={p.image}
                          overrides={overrides}
                          onSave={handleSave}
                        />
                      ))}
                    </div>
                  </motion.div>
                );
              })}

              {filteredProducts.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">No products match your search.</div>
              )}
            </div>
          )}

          {/* Applications Tab */}
          {tab === "applications" && (
            <div>
              <div className="grid md:grid-cols-2 gap-3">
                {filteredIndustries.map((i) => (
                  <ImageRow
                    key={i.slug}
                    type="industry"
                    slug={i.slug}
                    name={i.name}
                    defaultImage={i.image}
                    overrides={overrides}
                    onSave={handleSave}
                  />
                ))}
              </div>
              {filteredIndustries.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">No applications match your search.</div>
              )}
            </div>
          )}

          {/* Standards Tab */}
          {tab === "standards" && (
            <div>
              <div className="grid md:grid-cols-2 gap-3">
                {filteredStandards.map((s) => (
                  <ImageRow
                    key={s.slug}
                    type="standard"
                    slug={s.slug}
                    name={`${s.code} — ${s.name}`}
                    defaultImage={s.image}
                    overrides={overrides}
                    onSave={handleSave}
                  />
                ))}
              </div>
              {filteredStandards.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">No standards match your search.</div>
              )}
            </div>
          )}

          {/* Note */}
          <div className="mt-10 p-5 rounded-lg bg-secondary/30 border border-border text-sm text-muted-foreground">
            <p className="font-semibold text-foreground mb-1">How it works</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Paste any public image URL (from Unsplash, Google Drive, Cloudinary, etc.) into the field</li>
              <li>Click <strong>Save</strong> — the image is stored locally in your browser</li>
              <li>Reload any page on the site to see the updated image</li>
              <li>Click the reset button <RotateCcw className="inline w-3 h-3" /> to revert to the default image</li>
              <li>All overrides are stored per browser — clearing browser data will reset them</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
}
