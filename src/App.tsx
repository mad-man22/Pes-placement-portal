import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Companies from "./pages/Companies";
import CompanyDetail from "./pages/CompanyDetail";
import NotFound from "./pages/NotFound";
import Compare from "./pages/Compare";
import SkillFit from "./pages/SkillFit";
import Skills from "./pages/Skills";
import { HiringProcess } from "./components/research/views/HiringProcess";
import { HiringSkillSets } from "./components/research/views/HiringSkillSets";
import { InnovXHome } from "./components/research/views/InnovXHome";
import { CompanyHiringRounds } from "./components/research/views/CompanyHiringRounds";
import { CompanyResearchDetail } from "./components/research/views/CompanyResearchDetail";

const queryClient = new QueryClient();

import { Dashboard } from "./pages/Dashboard";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CodingPractice from "./pages/CodingPractice";

import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route path="/companies" element={
              <ProtectedRoute>
                <Companies />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/compare" element={
              <ProtectedRoute>
                <Compare />
              </ProtectedRoute>
            } />
            <Route path="/skill-fit" element={
              <ProtectedRoute>
                <SkillFit />
              </ProtectedRoute>
            } />
            <Route path="/skills" element={
              <ProtectedRoute>
                <Skills />
              </ProtectedRoute>
            } />
            <Route path="/company/:shortName" element={
              <ProtectedRoute>
                <CompanyDetail />
              </ProtectedRoute>
            } />

            {/* Research Portal Routes - Protected */}
            <Route path="/hiring-process" element={
              <ProtectedRoute>
                <HiringProcess />
              </ProtectedRoute>
            } />
            <Route path="/hiring-skillsets" element={
              <ProtectedRoute>
                <HiringSkillSets />
              </ProtectedRoute>
            } />
            <Route path="/innovx" element={
              <ProtectedRoute>
                <InnovXHome />
              </ProtectedRoute>
            } />
            <Route path="/company/:companyId/hiring" element={
              <ProtectedRoute>
                <CompanyHiringRounds />
              </ProtectedRoute>
            } />
            <Route path="/company/:companyId/innovx" element={
              <ProtectedRoute>
                <CompanyResearchDetail />
              </ProtectedRoute>
            } />
            <Route path="/practice" element={
              <ProtectedRoute>
                <CodingPractice />
              </ProtectedRoute>
            } />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
