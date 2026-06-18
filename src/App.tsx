import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import WhatsAppButton from "./components/WhatsAppButton.tsx";
import ScrollToTop from "./components/ScrollToTop";
import BrandingHead from "./components/BrandingHead";
import { useApplyBackgroundAnimation } from "@/hooks/useActiveAnimations";

// ── Public pages ──────────────────────────────────────────────────────────────
const ProductDetail = lazy(() => import("./pages/ProductDetail.tsx"));
const ProductsPage = lazy(() => import("./pages/ProductsPage.tsx"));
const CategoryPage = lazy(() => import("./pages/CategoryPage.tsx"));
const AboutPage = lazy(() => import("./pages/AboutPage.tsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.tsx"));
const IndustryDetail = lazy(() => import("./pages/IndustryDetail.tsx"));
const ApplicationsPage = lazy(() => import("./pages/ApplicationsPage.tsx"));
const SpecificationsPage = lazy(() => import("./pages/SpecificationsPage.tsx"));
const GradeChartPage = lazy(() => import("./pages/GradeChartPage.tsx"));
const StandardsPage = lazy(() => import("./pages/StandardsPage.tsx"));
const StandardDetail = lazy(() => import("./pages/StandardDetail.tsx"));
const GalleryPage = lazy(() => import("./pages/GalleryPage.tsx"));
const ImageEditorPage = lazy(() => import("./pages/ImageEditorPage.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

// ── Admin pages ───────────────────────────────────────────────────────────────
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin.tsx"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.tsx"));
const AdminProducts = lazy(() => import("./pages/admin/AdminProducts.tsx"));
const AdminCategories = lazy(() => import("./pages/admin/AdminCategories.tsx"));
const AdminIndustries = lazy(() => import("./pages/admin/AdminIndustries.tsx"));
const AdminStandards = lazy(() => import("./pages/admin/AdminStandards.tsx"));
const AdminContacts = lazy(() => import("./pages/admin/AdminContacts.tsx"));
const AdminMedia = lazy(() => import("./pages/admin/AdminMedia.tsx"));
const AdminContent = lazy(() => import("./pages/admin/AdminContent.tsx"));
const AdminSections = lazy(() => import("./pages/admin/AdminSections.tsx"));
const AdminBranding = lazy(() => import("./pages/admin/AdminBranding.tsx"));
const AdminAnimations = lazy(() => import("./pages/admin/AdminAnimations.tsx"));
const AdminGradeChart = lazy(() => import("./pages/admin/AdminGradeChart.tsx"));
const AdminSpecifications = lazy(() => import("./pages/admin/AdminSpecifications.tsx"));
const AdminCatalog = lazy(() => import("./pages/admin/AdminCatalog.tsx"));
const AdminLedger = lazy(() => import("./pages/admin/AdminLedger.tsx"));
const AdminLedgerCustomer = lazy(() => import("./pages/admin/AdminLedgerCustomer.tsx"));
const AdminMI = lazy(() => import("./pages/admin/AdminMI.tsx"));
const AdminBackups = lazy(() => import("./pages/admin/AdminBackups.tsx"));
const AdminApplications = lazy(() => import("./pages/admin/AdminApplications.tsx"));
const RequireAdminBase = lazy(() => import("./pages/admin/RequireAdmin.tsx"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

const RouteFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

// Protected admin wrapper — renders <Outlet /> for nested routes
const AdminGuard = () => (
  <Suspense fallback={<RouteFallback />}>
    <RequireAdminBase>
      <Outlet />
    </RequireAdminBase>
  </Suspense>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<RouteFallback />}>
        <Routes location={location} key={location.pathname}>
          {/* ── Public ─────────────────────────────────────────── */}
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/category/:category" element={<CategoryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/industry/:slug" element={<IndustryDetail />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/standards" element={<StandardsPage />} />
          <Route path="/standards/:slug" element={<StandardDetail />} />
          <Route path="/specifications" element={<SpecificationsPage />} />
          <Route path="/grade-chart" element={<GradeChartPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/image-editor" element={<ImageEditorPage />} />

          {/* ── Admin auth ──────────────────────────────────────── */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ── Protected admin ─────────────────────────────────── */}
          <Route path="/admin" element={<AdminGuard />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="industries" element={<AdminIndustries />} />
            <Route path="standards" element={<AdminStandards />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="media" element={<AdminMedia />} />
            <Route path="content" element={<AdminContent />} />
            <Route path="sections" element={<AdminSections />} />
            <Route path="branding" element={<AdminBranding />} />
            <Route path="animations" element={<AdminAnimations />} />
            <Route path="grade-chart" element={<AdminGradeChart />} />
            <Route path="specifications" element={<AdminSpecifications />} />
            <Route path="catalog" element={<AdminCatalog />} />
            <Route path="ledger" element={<AdminLedger />} />
            <Route path="ledger/customers" element={<AdminLedgerCustomer />} />
            <Route path="mi" element={<AdminMI />} />
            <Route path="backups" element={<AdminBackups />} />
            <Route path="applications" element={<AdminApplications />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

const SiteEffects = () => {
  useApplyBackgroundAnimation();
  return null;
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="always">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <BrandingHead />
            <SiteEffects />
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
