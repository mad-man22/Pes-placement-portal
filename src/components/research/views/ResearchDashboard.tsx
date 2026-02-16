import { useState } from "react";
import { Building2, Crown, Sparkles, Star, Users, Search } from "lucide-react";
import { useCompanies } from "@/hooks/useCompanies";

interface ResearchDashboardProps {
    onNavigate: (view: string, companyId?: string) => void;
}

const categoryConfig = [
    { key: "total", label: "Total Companies", icon: Building2, colorClass: "bg-blue-600 text-white" },
    { key: "Marquee", label: "Marquee", icon: Crown, colorClass: "bg-amber-500 text-white" },
    { key: "Super Dream", label: "Super Dream", icon: Sparkles, colorClass: "bg-purple-600 text-white" },
    { key: "Dream", label: "Dream", icon: Star, colorClass: "bg-teal-600 text-white" },
    { key: "Regular", label: "Regular", icon: Users, colorClass: "bg-slate-500 text-white" },
];

export const ResearchDashboard = ({ onNavigate }: ResearchDashboardProps) => {
    const { companies } = useCompanies();
    const [search, setSearch] = useState("");

    // Calculate counts
    const counts = {
        total: companies.length,
        Marquee: companies.filter(c => c.category === 'Marquee').length,
        "Super Dream": companies.filter(c => c.category === 'Super Dream').length,
        "Dream": companies.filter(c => c.category === 'Dream').length,
        "Regular": companies.filter(c => c.category === 'Regular').length,
    };

    const filtered = search
        ? companies.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.short_name.toLowerCase().includes(search.toLowerCase()))
        : [];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-slate-500 mt-1">PES Placements & Research Analytics Overview</p>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {categoryConfig.map(({ key, label, icon: Icon, colorClass }) => (
                    <div key={key} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer">
                        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3 ${colorClass}`}>
                            <Icon className="h-5 w-5" />
                        </div>
                        <p className="text-3xl font-bold">{(counts as any)[key]}</p>
                        <p className="text-sm text-muted-foreground mt-1">{label}</p>
                    </div>
                ))}
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search by company name (e.g., Amazon, TCS, Microsoft)"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />

                {search && filtered.length > 0 && (
                    <div className="absolute z-50 top-full mt-2 w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden max-h-96 overflow-y-auto">
                        {filtered.slice(0, 8).map(c => (
                            <button
                                key={c.company_id}
                                onClick={() => {
                                    onNavigate('company-detail', c.company_id.toString());
                                    setSearch("");
                                }}
                                className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0"
                            >
                                <div className="h-8 w-8 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold">
                                    {c.short_name.substring(0, 2)}
                                </div>
                                <div>
                                    <p className="font-medium text-sm">{c.name}</p>
                                    <p className="text-xs text-slate-500">{c.category}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
