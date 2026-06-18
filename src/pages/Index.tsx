import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductSlider from "@/components/ProductSlider";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";
import ApplicationsSection from "@/components/ApplicationsSection";
import StandardsSection from "@/components/StandardsSection";
import StatsCounter from "@/components/StatsCounter";
import SpecificationsSection from "@/components/SpecificationsSection";
import GradeChartSection from "@/components/GradeChartSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <PageTransition>
      <SEO
        title="M.I. Engineering Works | All Types of Industrial Fasteners Manufacturer & Supplier Mumbai India"
        description="M.I. Engineering Works — Leading manufacturer & supplier of all types of industrial fasteners including bolts, nuts, screws, stud bolts, threaded rods, washers, flanges, pipe fittings & more in Mumbai, India. 25+ years experience, 500+ clients. Call +91-9819972301."
        keywords={[
          "industrial fasteners manufacturer Mumbai",
          "all types of fasteners supplier India",
          "stud bolts manufacturer Mumbai",
          "hex bolts supplier India",
          "threaded rods manufacturer",
          "anchor bolts supplier Mumbai",
          "foundation bolts manufacturer India",
          "high tensile fasteners Mumbai",
          "flanges manufacturer India",
          "pipe fittings supplier Mumbai",
          "fasteners manufacturer India",
          "nuts bolts screws washers supplier",
        ]}
        path="/"
      />
      <div className="min-h-screen">
        <Header />
        <HeroSection />
        <ProductSlider />
        <AboutSection />
        <ProductsSection />
        <StatsCounter />
        <ApplicationsSection />
        <StandardsSection />
        <SpecificationsSection />
        <GradeChartSection />
        <ContactSection />
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
