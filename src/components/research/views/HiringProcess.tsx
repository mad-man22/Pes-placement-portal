import { useState } from "react";
import { Search, GitBranch, MapPin, Briefcase, Loader2, Building2, ArrowRight } from "lucide-react";
import { useHiringList } from "@/hooks/useHiringList";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

export const HiringProcess = () => {
    const { data: companies, loading, error } = useHiringList();
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const filtered = search
        ? companies.filter(c =>
            c.company_name.toLowerCase().includes(search.toLowerCase()) ||
            (c.company.short_name && c.company.short_name.toLowerCase().includes(search.toLowerCase()))
        )
        : companies;

    // Helper to count rounds if available in JSON
    const getRoundCount = (hiringData: any) => {
        if (hiringData && hiringData.job_role_details && Array.isArray(hiringData.job_role_details)) {
            // Sum rounds across all job roles
            return hiringData.job_role_details.reduce((acc: number, role: any) => {
                return acc + (role.hiring_rounds?.length || 0);
            }, 0);
        }
        // Fallback for previous structure if any
        if (hiringData && hiringData.rounds && Array.isArray(hiringData.rounds)) {
            return hiringData.rounds.length;
        }
        return 0;
    };

    return (
        <Layout>
            <div className="p-8 animate-in fade-in duration-500">
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="h-6 w-6 text-blue-500" />
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Hiring Process Analysis</h1>
                    </div>
                    <p className="text-slate-500">Deep dive into recruitment rounds and interview stages for {companies.length} companies.</p>
                </div>

                <div className="relative mb-8 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search companies..."
                        className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {loading ? (
                    <div className="flex h-64 items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                    </div>
                ) : error ? (
                    <div className="text-center py-12 text-red-500">
                        <p>Error loading dashboard: {error}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filtered.map(item => (
                            <button
                                key={item.id}
                                onClick={() => navigate(`/company/${item.company_id}/hiring`)}
                                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-500/50 hover:shadow-md hover:shadow-blue-500/5 transition-all group text-left h-full flex flex-col"
                            >
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="h-12 w-12 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center p-2 group-hover:scale-110 transition-transform duration-300">
                                        {item.company.logo_url ? (
                                            <img src={item.company.logo_url} alt={item.company_name} className="w-full h-full object-contain" />
                                        ) : (
                                            <Building2 className="h-6 w-6 text-slate-300" />
                                        )}
                                    </div>
                                    <div className="overflow-hidden">
                                        <h3 className="font-semibold text-sm truncate group-hover:text-blue-600 transition-colors">
                                            {item.company.short_name || item.company_name}
                                        </h3>
                                        <p className="text-xs text-slate-500 flex items-center gap-1 truncate mt-1">
                                            <MapPin className="h-3 w-3 shrink-0" />
                                            {item.company.headquarters_address || 'Global'}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-auto pt-3 border-t border-slate-100 w-full">
                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                        <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2 py-1 rounded-md">
                                            <GitBranch className="h-3.5 w-3.5" />
                                            <span className="font-medium">{getRoundCount(item.hiring_data)} Rounds</span>
                                        </div>
                                        <ArrowRight className="h-3 w-3 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {!loading && filtered.length === 0 && (
                    <div className="text-center py-12 text-slate-400">
                        <Building2 className="h-12 w-12 mx-auto mb-3 opacity-20" />
                        <p>No companies found matching your search.</p>
                    </div>
                )}
            </div>
        </Layout>
    );
};
