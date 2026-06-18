import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GradeChartSection from "@/components/GradeChartSection";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";

const GradeChartPage = () => {
  return (
    <PageTransition>
      <SEO
        title="Fastener Grade Chart — ASTM, DIN, ISO, SAE Grades | M.I. Engineering Works"
        description="Complete fastener grade chart — ASTM A193 B7/B16/L7/B8/B8M, ISO 8.8/10.9/12.9, SAE Grade 2/5/8, Stainless SS 304/316, Duplex 2205. Tensile strength, yield, hardness by material and standard. M.I. Engineering Works Mumbai."
        keywords={[
          "fastener grade chart",
          "bolt grade chart",
          "nut grade chart",
          "ASTM fastener grades",
          "ISO property class chart",
          "DIN fastener grades",
          "SAE bolt grades",
          "stainless steel fastener grades",
          "alloy steel fastener grades",
          "carbon steel fastener grades",
          "high tensile bolt grades",
          "fastener mechanical properties",
          "bolt tensile strength chart",
          "fastener yield strength",
          "hardness chart fasteners",
        ]}
        path="/grade-chart"
      />
      <Header />
      <GradeChartSection />
      <Footer />
    </PageTransition>
  );
};

export default GradeChartPage;
