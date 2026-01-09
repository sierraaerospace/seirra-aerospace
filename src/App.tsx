import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Warranty from "./pages/Warranty";
import ShippingReturns from "./pages/ShippingReturns";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ConditionsOfSale from "./pages/ConditionsOfSale";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/warranty" element={<Warranty />} />
            <Route path="/shipping-returns" element={<ShippingReturns />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/conditions-of-sale" element={<ConditionsOfSale />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
