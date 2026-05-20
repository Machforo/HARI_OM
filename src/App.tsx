import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { CRMLayout } from "@/components/CRMLayout";
import Index from "./pages/Index";
import Temples from "./pages/Temples";
import TempleDetail from "./pages/TempleDetail";
import TempleServiceDetail from "./pages/TempleServiceDetail";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Book from "./pages/Book";
import ThankYou from "./pages/ThankYou";
import Terms from "./pages/legal/Terms";
import Privacy from "./pages/legal/Privacy";
import Cancellation from "./pages/legal/Cancellation";
import Shipping from "./pages/legal/Shipping";
import Disclaimer from "./pages/legal/Disclaimer";
import NotFound from "./pages/NotFound";
import CRMLogin from "./pages/crm/Login";
import CRMDashboard from "./pages/crm/Dashboard";
import AllLeads from "./pages/crm/AllLeads";
import LeadDetail from "./pages/crm/LeadDetail";
import RoleManagement from "./pages/crm/RoleManagement";
import Reports from "./pages/crm/Reports";
import SpiritualMedia from "./pages/SpiritualMedia";
import BlogPost from "./pages/BlogPost";
import MasterServicePage from "./pages/MasterServicePage";
import SpiritualConsultant from "./pages/SpiritualConsultant";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Main Website Routes */}
              <Route
                element={<Layout />}
              >
                <Route path="/" element={<Index />} />
                <Route path="/temples" element={<Temples />} />
                
                <Route path="/:templeSlug" element={<TempleDetail />} />
                <Route path="/:templeSlug/darshan" element={<TempleDetail />} />
                
                {/* Temple Services Sub-pages */}
                <Route path="/:templeSlug/:serviceType" element={<TempleServiceDetail />} />
                
                <Route path="/blogs" element={<SpiritualMedia />} />
                <Route path="/blogs/:slug" element={<BlogPost />} />
                
                <Route path="/consultant" element={<SpiritualConsultant />} />
                
                <Route path="/darshan" element={<MasterServicePage type="darshan" />} />
                <Route path="/puja" element={<MasterServicePage type="puja" />} />
                <Route path="/prasad" element={<MasterServicePage type="prasad" />} />
                <Route path="/chadhava" element={<MasterServicePage type="chadhava" />} />

                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/book" element={<Book />} />
                <Route path="/thank-you" element={<ThankYou />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/cancellation" element={<Cancellation />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
              </Route>

              {/* CRM Routes */}
              <Route path="/crm" element={<Navigate to="/crm/dashboard" replace />} />
              <Route path="/crm/login" element={<CRMLogin />} />
              <Route
                path="/crm/dashboard"
                element={
                  <ProtectedRoute>
                    <CRMLayout>
                      <CRMDashboard />
                    </CRMLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/crm/leads"
                element={
                  <ProtectedRoute requiredPermission="view_leads">
                    <CRMLayout>
                      <AllLeads />
                    </CRMLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/crm/leads/:id"
                element={
                  <ProtectedRoute requiredPermission="view_leads">
                    <CRMLayout>
                      <LeadDetail />
                    </CRMLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/crm/leads/:id/edit"
                element={
                  <ProtectedRoute requiredPermission="edit_lead">
                    <CRMLayout>
                      <LeadDetail />
                    </CRMLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/crm/roles"
                element={
                  <ProtectedRoute requiredPermission="manage_roles">
                    <CRMLayout>
                      <RoleManagement />
                    </CRMLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/crm/reports"
                element={
                  <ProtectedRoute requiredPermission="view_reports">
                    <CRMLayout>
                      <Reports />
                    </CRMLayout>
                  </ProtectedRoute>
                }
              />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
