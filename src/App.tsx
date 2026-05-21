import React, { Suspense, lazy } from 'react';
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

const Index = lazy(() => import("./pages/Index"));
const Temples = lazy(() => import("./pages/Temples"));
const TempleDetail = lazy(() => import("./pages/TempleDetail"));
const TempleServiceDetail = lazy(() => import("./pages/TempleServiceDetail"));
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Book = lazy(() => import("./pages/Book"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const Terms = lazy(() => import("./pages/legal/Terms"));
const Privacy = lazy(() => import("./pages/legal/Privacy"));
const Cancellation = lazy(() => import("./pages/legal/Cancellation"));
const Shipping = lazy(() => import("./pages/legal/Shipping"));
const Disclaimer = lazy(() => import("./pages/legal/Disclaimer"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CRMLogin = lazy(() => import("./pages/crm/Login"));
const CRMDashboard = lazy(() => import("./pages/crm/Dashboard"));
const AllLeads = lazy(() => import("./pages/crm/AllLeads"));
const LeadDetail = lazy(() => import("./pages/crm/LeadDetail"));
const RoleManagement = lazy(() => import("./pages/crm/RoleManagement"));
const Reports = lazy(() => import("./pages/crm/Reports"));
const SpiritualMedia = lazy(() => import("./pages/SpiritualMedia"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const MasterServicePage = lazy(() => import("./pages/MasterServicePage"));
const SpiritualConsultant = lazy(() => import("./pages/SpiritualConsultant"));


const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
              </div>
            }>
              <Routes>
                {/* Main Website Routes */}
              <Route
                element={<Layout />}
              >
                <Route path="/" element={<Index />} />
                <Route path="/temples" element={<Temples />} />
                <Route path="/temples/:templeSlug" element={<TempleDetail />} />
                
                {/* SEO-friendly Service Routes */}
                <Route path="/darshans/:darshanSlug" element={<TempleDetail />} />
                <Route path="/puja/:templeSlug" element={<TempleServiceDetail type="puja" />} />
                <Route path="/prasadam/:templeSlug" element={<TempleServiceDetail type="prasad" />} />
                <Route path="/chadhava/:templeSlug" element={<TempleServiceDetail type="chadhava" />} />
                
                {/* Media & Blogs */}
                <Route path="/media" element={<SpiritualMedia />} />
                <Route path="/media/blogs" element={<SpiritualMedia />} />
                <Route path="/media/blogs/:slug" element={<BlogPost />} />
                
                {/* Old Routes Redirects (for SEO) */}
                <Route path="/blogs" element={<Navigate to="/media/blogs" replace />} />
                <Route path="/blogs/:slug" element={<Navigate to="/media/blogs/:slug" replace />} />
                
                {/* Master Services (Listings) */}
                <Route path="/darshan" element={<MasterServicePage type="darshan" />} />
                <Route path="/puja" element={<MasterServicePage type="puja" />} />
                <Route path="/prasad" element={<MasterServicePage type="prasad" />} />
                <Route path="/chadhava" element={<MasterServicePage type="chadhava" />} />

                <Route path="/consultant" element={<SpiritualConsultant />} />
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

                {/* Legacy Catch-alls for old URLs */}
                <Route path="/:templeSlug" element={<TempleDetail />} />
                <Route path="/:templeSlug/darshan" element={<TempleDetail />} />
                <Route path="/:templeSlug/:serviceType" element={<TempleServiceDetail />} />
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
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
