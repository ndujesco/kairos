import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PatientPortal from "./pages/PatientPortal";
import HospitalDashboard from "./pages/HospitalDashboard";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import AmbulanceTracking from "./pages/AmbulanceTracking";
import HospitalOnboarding from "./pages/HospitalOnboarding";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/patient" element={<PatientPortal />} />
          <Route path="/hospital" element={<HospitalDashboard />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route path="/ambulance-tracking" element={<AmbulanceTracking />} />
          <Route path="/hospital-onboarding" element={<HospitalOnboarding />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
