import { useState, useEffect } from "react";
import { accentureInnovXData } from "@/data/innovxData";
import { IndustryTrends } from "./sections/IndustryTrends";
import { InnovationRoadmap } from "./sections/InnovationRoadmap";
import { CompetitiveLandscape } from "./sections/CompetitiveLandscape";
import { StrategicPillars } from "./sections/StrategicPillars";
import { InnovXProjects } from "./sections/InnovXProjects";
import { ResearchLayout } from "./layout/ResearchLayout";
import { ResearchDashboard } from "./dashboard/ResearchDashboard";
import { useInnovX } from "@/hooks/useInnovX";
import { useCompanies } from "@/hooks/useCompanies";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export const ResearchPortal = () => {

    // State for view and selected company
    const [activeView, setActiveView] = useState("dashboard");
    const [selectedCompanyId, setSelectedCompanyId] = useState<string>("");

    // Fetch available companies
    const { companies, loading: companiesLoading } = useCompanies();

    // Fetch InnovX data for selected company
    const { data: realData, loading: dataLoading, error } = useInnovX(
        selectedCompanyId ? parseInt(selectedCompanyId) : undefined
    );

    // Fallback to mock data if no company selected or for demo
    // Logic: If user selects a company, try to show real data. 
    // If loading, show loader. If error or no data, show empty state or fallback.
    // For now, we default to the mock data if no company is selected to show the UI
    const displayData = realData || (selectedCompanyId ? null : accentureInnovXData);

    // Auto-select Accenture mock if available in list to demo real data fetching (optional)
    useEffect(() => {
        if (!selectedCompanyId && companies.length > 0) {
            // Try to find Accenture or just pick the first one for UX
            const accenture = companies.find(c => c.name.toLowerCase().includes('accenture'));
            if (accenture) setSelectedCompanyId(accenture.company_id.toString());
        }
    }, [companies]);

    // Render loading state
    if (companiesLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    // Company Selector Component (to be placed in layout potentially or overlay)
    // For now, if no data is present, we force selection
    if (!displayData) {
        return (
            <div className="flex h-screen flex-col items-center justify-center space-y-4 bg-slate-50 dark:bg-slate-900">
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold">Select an Enterprise</h2>
                    <p className="text-muted-foreground">Choose a company to access the Research Portal.</p>
                </div>
                <Select value={selectedCompanyId} onValueChange={setSelectedCompanyId}>
                    <SelectTrigger className="w-[300px]">
                        <SelectValue placeholder="Select Company" />
                    </SelectTrigger>
                    <SelectContent>
                        {companies.map((company) => (
                            <SelectItem key={company.company_id} value={company.company_id.toString()}>
                                {company.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {dataLoading && <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />}
                {error && <p className="text-destructive text-sm">{error}</p>}
            </div>
        );
    }

    return (
        <ResearchLayout
            activeView={activeView}
            onViewChange={setActiveView}
            companyName={displayData.innovx_master.company_name}
        >
            {/* View Routing */}
            {activeView === "dashboard" && (
                <ResearchDashboard
                    data={displayData}
                    onNavigate={setActiveView}
                />
            )}

            {activeView === "overview" && (
                <IndustryTrends trends={displayData.industry_trends} />
            )}

            {activeView === "innovation" && (
                <InnovationRoadmap roadmap={displayData.innovation_roadmap} />
            )}

            {activeView === "projects" && (
                <InnovXProjects projects={displayData.innovx_projects} />
            )}

            {activeView === "competition" && (
                <CompetitiveLandscape competitors={displayData.competitive_landscape} />
            )}

            {activeView === "strategy" && (
                <StrategicPillars pillars={displayData.strategic_pillars} />
            )}
        </ResearchLayout>
    );
};
