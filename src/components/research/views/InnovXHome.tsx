import { useState } from "react";
import { Search, Lightbulb, MapPin, Building2, ArrowRight, Loader2 } from "lucide-react";
import { useInnovXList } from "@/hooks/useInnovXList";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

export const InnovXHome = () => {
    const { data: companies, loading, error } = useInnovXList();
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const filtered = search
        ? companies.filter(c =>
            c.company_name.toLowerCase().includes(search.toLowerCase()) ||
            (c.company.short_name && c.company.short_name.toLowerCase().includes(search.toLowerCase())) ||
            (c.industry && c.industry.toLowerCase().includes(search.toLowerCase()))
        )
        : companies;

    return (
        <Layout>
            <div className="p-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
                <div className="mb-8 border-b border-border pb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
                            <Lightbulb className="h-5 w-5 text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold text-foreground">InnovX Ecosystem</h1>
                    </div>
                    <p className="text-muted-foreground text-sm max-w-2xl">Explore innovation tiers, strategic pillars, and future trends across {companies.length} companies.</p>
                </div>

                <div className="relative mb-8 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search companies, industries..."
                        className="w-full pl-9 pr-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring focus:border-input transition-colors text-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {loading ? (
                    <div className="flex h-64 items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : error ? (
                    <div className="text-center py-12 text-destructive">
                        <p>Error loading dashboard: {error}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filtered.map(item => (
                            <button
                                key={item.id}
                                onClick={() => navigate(`/company/${item.company_id}/innovx`)}
                                className="bg-card p-5 rounded-lg border border-border hover:border-primary/50 hover:shadow-md transition-all group text-left h-full flex flex-col"
                            >
                                <div className="flex items-start gap-4 mb-3">
                                    <div className="h-10 w-10 rounded bg-secondary/50 border border-border flex items-center justify-center p-2 group-hover:bg-secondary transition-colors duration-200">
                                        {item.company.logo_url ? (
                                            <img src={item.company.logo_url} alt={item.company_name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all opacity-80 group-hover:opacity-100" />
                                        ) : (
                                            <Building2 className="h-5 w-5 text-muted-foreground" />
                                        )}
                                    </div>
                                    <div className="overflow-hidden">
                                        <h3 className="font-semibold text-sm truncate text-foreground group-hover:text-primary transition-colors">
                                            {item.company.short_name || item.company_name}
                                        </h3>
                                        {item.industry && (
                                            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mt-1 block">
                                                {item.industry}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-auto pt-3 border-t border-border w-full">
                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1 truncate max-w-[75%]">
                                            <MapPin className="h-3 w-3 shrink-0" />
                                            <span className="truncate">{item.location || 'Global'}</span>
                                        </div>
                                        <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-primary" />
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {!loading && filtered.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        <Building2 className="h-10 w-10 mx-auto mb-3 opacity-20" />
                        <p>No companies found matching your search.</p>
                    </div>
                )}
            </div>
        </Layout>
    );
};
