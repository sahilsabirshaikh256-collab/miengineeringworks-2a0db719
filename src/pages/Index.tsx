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
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>M.I. Engineering Works | ASTM A193 Grade B7 Fasteners Manufacturer & Supplier Mumbai India</title>
        <meta name="description" content="M.I. Engineering Works — Leading manufacturer & supplier of ASTM A193 Grade B7 stud bolts, hex bolts, threaded rods, anchor bolts & high-tensile fasteners in Mumbai, India. 25+ years experience, 500+ clients. Call +91-9819972301." />
      </Helmet>
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
