import { useState } from "react";
import { ResearchLayout } from "@/components/research/layout/ResearchLayout";
import { ResearchDashboard } from "@/components/research/views/ResearchDashboard";
import { CompanyResearchDetail } from "@/components/research/views/CompanyResearchDetail";
import { HiringProcess } from "@/components/research/views/HiringProcess";
import { HiringSkillSets } from "@/components/research/views/HiringSkillSets";
import { CompanyHiringRounds } from "@/components/research/views/CompanyHiringRounds";
import { CompaniesDirectory } from "@/components/research/views/CompaniesDirectory";
import { InnovXHome } from "@/components/research/views/InnovXHome";

const Skills = () => {
    // State for local routing within the Research Portal
    const [currentView, setCurrentView] = useState("dashboard");
    const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);

    const handleViewChange = (view: string, companyId?: string) => {
        setCurrentView(view);
        if (companyId) {
            setSelectedCompanyId(companyId);
        }
    };

    return (
        <ResearchLayout currentView={currentView} onViewChange={handleViewChange}>
            {currentView === "dashboard" && (
                <ResearchDashboard onNavigate={handleViewChange} />
            )}

            {currentView === "innovx" && (
                <InnovXHome onNavigate={handleViewChange} />
            )}

            {currentView === "company-detail" && selectedCompanyId && (
                <CompanyResearchDetail companyId={selectedCompanyId} />
            )}

            {currentView === "hiring-process" && (
                <HiringProcess onNavigate={handleViewChange} />
            )}

            {currentView === "hiring-skills" && (
                <HiringSkillSets onNavigate={handleViewChange} />
            )}

            {currentView === "company-hiring-rounds" && selectedCompanyId && (
                <CompanyHiringRounds companyId={selectedCompanyId} />
            )}

            {currentView === "companies" && (
                <CompaniesDirectory onNavigate={handleViewChange} />
            )}
        </ResearchLayout>
    );
};

export default Skills;
