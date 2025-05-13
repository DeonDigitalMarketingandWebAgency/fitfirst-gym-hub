
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";
import Packages from "./pages/Packages";
import Trainers from "./pages/Trainers";
import Equipment from "./pages/Equipment";
import Contact from "./pages/Contact";

// Package Pages
import MonthlyPackages from "./pages/packages/MonthlyPackages";
import QuarterlyPackages from "./pages/packages/QuarterlyPackages";
import HalfYearlyPackages from "./pages/packages/HalfYearlyPackages";
import AnnualPackages from "./pages/packages/AnnualPackages";
import PersonalTraining from "./pages/packages/PersonalTraining";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Package Routes */}
          <Route path="/packages/monthly" element={<MonthlyPackages />} />
          <Route path="/packages/quarterly" element={<QuarterlyPackages />} />
          <Route path="/packages/half-yearly" element={<HalfYearlyPackages />} />
          <Route path="/packages/annual" element={<AnnualPackages />} />
          <Route path="/packages/personal-training" element={<PersonalTraining />} />
          
          {/* Member Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Additional member routes would go here */}
          
          {/* Admin Dashboard Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          {/* Additional admin routes would go here */}
          
          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
