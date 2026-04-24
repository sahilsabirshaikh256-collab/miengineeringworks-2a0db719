import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import IndustryDetail from "./pages/IndustryDetail.tsx";
import ApplicationsPage from "./pages/ApplicationsPage.tsx";
import SpecificationsPage from "./pages/SpecificationsPage.tsx";
import GradeChartPage from "./pages/GradeChartPage.tsx";
import StandardsPage from "./pages/StandardsPage.tsx";
import StandardDetail from "./pages/StandardDetail.tsx";
import GalleryPage from "./pages/GalleryPage.tsx";
import AdminLogin from "./pages/admin/AdminLogin.tsx";
import AdminMedia from "./pages/admin/AdminMedia.tsx";
import WhatsAppButton from "./components/WhatsAppButton.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminProducts from "./pages/admin/AdminProducts.tsx";
import AdminIndustries from "./pages/admin/AdminIndustries.tsx";
import AdminStandards from "./pages/admin/AdminStandards.tsx";
import AdminContacts from "./pages/admin/AdminContacts.tsx";
import RequireAdmin from "./pages/admin/RequireAdmin.tsx";
import NotFound from "./pages/NotFound.tsx";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/industry/:slug" element={<IndustryDetail />} />
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="/standards" element={<StandardsPage />} />
        <Route path="/standards/:slug" element={<StandardDetail />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/specifications" element={<SpecificationsPage />} />
        <Route path="/grade-chart" element={<GradeChartPage />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
        <Route path="/admin/products" element={<RequireAdmin><AdminProducts /></RequireAdmin>} />
        <Route path="/admin/industries" element={<RequireAdmin><AdminIndustries /></RequireAdmin>} />
        <Route path="/admin/standards" element={<RequireAdmin><AdminStandards /></RequireAdmin>} />
        <Route path="/admin/media" element={<RequireAdmin><AdminMedia /></RequireAdmin>} />
        <Route path="/admin/contacts" element={<RequireAdmin><AdminContacts /></RequireAdmin>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      {/* reducedMotion="always" disables scroll-triggered & all motion animations so pages open instantly */}
      <MotionConfig reducedMotion="always">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <AnimatedRoutes />
            <WhatsAppButton />
          </BrowserRouter>
        </TooltipProvider>
      </MotionConfig>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
