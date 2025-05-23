
import React from 'react';
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
import Payment from "./pages/Payment";

// Package Pages
import MonthlyPackages from "./pages/packages/MonthlyPackages";
import QuarterlyPackages from "./pages/packages/QuarterlyPackages";
import HalfYearlyPackages from "./pages/packages/HalfYearlyPackages";
import AnnualPackages from "./pages/packages/AnnualPackages";
import PersonalTraining from "./pages/packages/PersonalTraining";

// User Dashboard Pages
import Profile from "./pages/dashboard/Profile";
import UserPackages from "./pages/dashboard/UserPackages";
import BookingHistory from "./pages/dashboard/BookingHistory";
import ChangePassword from "./pages/dashboard/ChangePassword";

// Admin Dashboard Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegister from "./pages/admin/AdminRegister";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminPackages from "./pages/admin/AdminPackages";
import AdminPackageTypes from "./pages/admin/AdminPackageTypes";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminAddPackage from "./pages/admin/AdminAddPackage";
import AdminRegisterMember from "./pages/admin/AdminRegisterMember";
import AdminReports from "./pages/admin/AdminReports";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
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
            <Route path="/payment" element={<Payment />} />
            
            {/* Package Routes */}
            <Route path="/packages/monthly" element={<MonthlyPackages />} />
            <Route path="/packages/quarterly" element={<QuarterlyPackages />} />
            <Route path="/packages/half-yearly" element={<HalfYearlyPackages />} />
            <Route path="/packages/annual" element={<AnnualPackages />} />
            <Route path="/packages/personal-training" element={<PersonalTraining />} />
            
            {/* User Dashboard Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/packages" element={<UserPackages />} />
            <Route path="/dashboard/booking-history" element={<BookingHistory />} />
            <Route path="/dashboard/change-password" element={<ChangePassword />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            
            {/* Admin Dashboard Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/packages" element={<AdminPackages />} />
            <Route path="/admin/package-types" element={<AdminPackageTypes />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/add-package" element={<AdminAddPackage />} />
            <Route path="/admin/register-member" element={<AdminRegisterMember />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            
            {/* Catch-all for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
