import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import Temples from "./pages/Temples";
import TempleDetail from "./pages/TempleDetail";
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

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/temples" element={<Temples />} />
              <Route path="/temples/:slug" element={<TempleDetail />} />
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
