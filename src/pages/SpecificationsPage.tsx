import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SpecificationsSection from "@/components/SpecificationsSection";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";

const SpecificationsPage = () => {
  return (
    <PageTransition>
      <SEO
        title="Fastener Technical Specifications — Chemical & Mechanical Properties | M.I. Engineering Works"
        description="Complete technical specifications for industrial fasteners — chemical composition, mechanical properties (tensile strength, yield strength, hardness), dimensional standards. ASTM, DIN, ISO fastener specs. M.I. Engineering Works Mumbai."
        keywords={[
          "fastener specifications",
          "bolt technical specifications",
          "fastener chemical composition",
          "fastener mechanical properties",
          "bolt tensile strength specifications",
          "fastener yield strength",
          "fastener hardness specifications",
          "stud bolt specifications",
          "hex bolt specifications",
          "stainless steel fastener specs",
          "alloy steel bolt specifications",
          "ASTM fastener specifications",
          "DIN fastener specifications",
          "ISO fastener specifications",
        ]}
        path="/specifications"
      />
      <Header />
      <SpecificationsSection />
      <Footer />
    </PageTransition>
  );
};

export default SpecificationsPage;
