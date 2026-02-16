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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Companies />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/skill-fit" element={<SkillFit />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/company/:shortName" element={<CompanyDetail />} />

          {/* Research Portal Routes */}
          <Route path="/hiring-process" element={<HiringProcess />} />
          <Route path="/hiring-skillsets" element={<HiringSkillSets />} />
          <Route path="/innovx" element={<InnovXHome />} />
          <Route path="/company/:companyId/hiring" element={<CompanyHiringRounds />} />
          <Route path="/company/:companyId/innovx" element={<CompanyResearchDetail />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
