import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/main-layout";
import Dashboard from "./pages/Dashboard";
import Subscriptions from "./pages/Subscriptions";
import Invoices from "./pages/Invoices";
import PaymentMethods from "./pages/PaymentMethods";
import BillingSettings from "./pages/BillingSettings";
import PaymentIssues from "./pages/PaymentIssues";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/subscriptions" element={<MainLayout><Subscriptions /></MainLayout>} />
          <Route path="/invoices" element={<MainLayout><Invoices /></MainLayout>} />
          <Route path="/payment-methods" element={<MainLayout><PaymentMethods /></MainLayout>} />
          <Route path="/billing-settings" element={<MainLayout><BillingSettings /></MainLayout>} />
          <Route path="/payment-issues" element={<MainLayout><PaymentIssues /></MainLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
