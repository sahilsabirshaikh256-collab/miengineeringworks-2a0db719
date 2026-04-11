import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import SpecificationsSection from "@/components/SpecificationsSection";
import GradeChartSection from "@/components/GradeChartSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Header />
        <HeroSection />
        <ProductsSection />
        <SpecificationsSection />
        <GradeChartSection />
        <ContactSection />
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
