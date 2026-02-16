import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { Search, MapPin, Users, Calendar, Building2 } from "lucide-react";
import { useCompanies } from "@/hooks/useCompanies";

interface CompaniesDirectoryProps {
    onNavigate: (view: string, companyId?: string) => void;
}

const categoryColors: Record<string, string> = {
    Marquee: "bg-amber-500 text-white",
    SuperDream: "bg-purple-600 text-white",
    Dream: "bg-teal-600 text-white",
    Regular: "bg-slate-500 text-white",
};

export const CompaniesDirectory = ({ onNavigate }: CompaniesDirectoryProps) => {
    const { companies } = useCompanies();
    // We don't have real router search params here since we are in a sub-app, 
    // but we can add local state for filtering if needed later. 
    // For now, simple search.
    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        let list = companies;
        if (search) {
            list = list.filter(c =>
                c.name.toLowerCase().includes(search.toLowerCase()) ||
                c.short_name.toLowerCase().includes(search.toLowerCase())
            );
        }
        return list;
    }, [companies, search]);

    return (
        <div className="animate-in fade-in duration-500">
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
                <p className="text-slate-500 mt-1">Browse all recruiting companies</p>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search company by name (e.g., Google, Infosys, Amazon)"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map(company => (
                    <button
                        key={company.company_id}
                        onClick={() => onNavigate('company-detail', company.company_id.toString())}
                        className="group bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-left"
                    >
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                                {company.logos && company.logos[0] ? (
                                    <img
                                        src={company.logos[0].logo_url}
                                        alt={company.short_name}
                                        className="w-10 h-10 object-contain"
                                        onError={(e) => {
                                            const el = e.target as HTMLImageElement;
                                            el.style.display = 'none';
                                            el.parentElement!.innerHTML = `<span class="font-bold text-lg text-blue-600">${company.short_name[0]}</span>`;
                                        }}
                                    />
                                ) : (
                                    <span className="font-bold text-lg text-blue-600">{company.short_name[0]}</span>
                                )}
                            </div>
                            <div className="min-w-0">
                                <h3 className="font-semibold text-sm leading-tight group-hover:text-blue-600 transition-colors truncate">
                                    {company.name}
                                </h3>
                                <span className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full font-medium ${categoryColors[company.category.replace(/\s/g, '')] || "bg-slate-100 text-slate-500"}`}>
                                    {company.category}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2 text-xs text-slate-500">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                                <span>Est. {company.incorporation_year}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="h-3.5 w-3.5 flex-shrink-0" />
                                <span>{company.employee_size} employees</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                                <span className="truncate">{company.headquarters_address}</span>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-16">
                    <Building2 className="h-12 w-12 mx-auto mb-4 text-slate-200" />
                    <p className="text-slate-500 text-lg">No companies found</p>
                </div>
            )}
        </div>
    );
}
