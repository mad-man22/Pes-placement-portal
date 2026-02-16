import { useInnovX } from "@/hooks/useInnovX";
import { TrendingUp, Shield, Lightbulb, Zap, Layers, ArrowRight, Loader2, AlertCircle, Sparkles } from "lucide-react"; // Added Sparkles
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { DetailHeader } from "@/components/company/DetailHeader"; // Import

interface CompanyResearchDetailProps {
    companyId: string;
}

const importanceColors: Record<string, string> = {
    Critical: "bg-red-500/10 text-red-600",
    High: "bg-amber-500/10 text-amber-600",
    Medium: "bg-blue-500/10 text-blue-600",
};

const threatColors: Record<string, string> = {
    High: "bg-red-500/10 text-red-600",
    Medium: "bg-amber-500/10 text-amber-600",
    Low: "bg-blue-500/10 text-blue-600",
};

const tierConfig: Record<string, { label: string; color: string; bg: string }> = {
    "Tier 1": { label: "Foundational Innovation", color: "text-teal-600", bg: "bg-teal-50 border-teal-200" },
    "Tier 2": { label: "Advanced Innovation", color: "text-blue-600", bg: "bg-blue-50 border-blue-200" },
    "Tier 3": { label: "Breakthrough Innovation", color: "text-purple-600", bg: "bg-purple-50 border-purple-200" },
};

export const CompanyResearchDetail = () => {
    const { companyId } = useParams<{ companyId: string }>();
    const { data, loading, error } = useInnovX(companyId ? parseInt(companyId) : 0);

    console.log("CompanyDetail Debug:", { companyId, loading, error, data });


    if (loading) {
        return (
            <Layout>
                <div className="flex h-64 items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-slate-300" />
                </div>
            </Layout>
        );
    }

    if (error || !data) {
        return (
            <Layout>
                <div className="flex h-64 flex-col items-center justify-center text-red-500">
                    <AlertCircle className="w-8 h-8 mb-2" />
                    <p>Failed to load company research data. {error}</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout showBackButton={true}>
            <div className="p-8 animate-in fade-in duration-500 space-y-12">
                {/* Headerr with DetailHeader */}
                <DetailHeader
                    title={data.innovx_master.company_name}
                    subtitle="Research, Innovation Strategies & Competitive Analysis"
                    // @ts-ignore - Assuming logo comes from master data join or similar logic
                    logoUrl={data.innovx_master?.company?.logo_url || data.innovx_master?.logo_url}
                    tags={["InnovX Report", `${data.industry_trends?.length || 0} Trends`]}
                    gradient="from-teal-500/10 to-emerald-500/10"
                    stats={[
                        { label: "Strategic Pillars", value: data.strategic_pillars?.length || 0, icon: Layers, color: "text-amber-500" },
                        { label: "Innovation Projects", value: data.innovx_projects?.length || 0, icon: Lightbulb, color: "text-teal-500" },
                        { label: "Key Competitors", value: data.competitive_landscape?.length || 0, icon: Shield, color: "text-blue-500" }
                    ]}
                />

                {/* Industry Trends */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="h-5 w-5 text-teal-600" />
                        <h2 className="text-xl font-bold">Industry Trends</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data.industry_trends.map((trend, i) => (
                            <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="font-semibold text-sm leading-tight">{trend.trend_name}</h3>
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ml-2 ${importanceColors[trend.strategic_importance] || "bg-slate-100 text-slate-500"}`}>
                                        {trend.strategic_importance}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 mb-3 leading-relaxed">{trend.trend_description}</p>
                                <div className="flex flex-wrap gap-1 mb-2">
                                    {trend.impact_areas.map((a, ai) => (
                                        <span key={ai} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{a}</span>
                                    ))}
                                </div>
                                <p className="text-[10px] text-slate-400">⏱ {trend.time_horizon_years} year horizon</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Competitive Landscape */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <Shield className="h-5 w-5 text-teal-600" />
                        <h2 className="text-xl font-bold">Competitive Landscape</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.competitive_landscape.map((comp, i) => (
                            <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h3 className="font-semibold">{comp.competitor_name}</h3>
                                        <span className="text-xs text-slate-500">{comp.competitor_type} Competitor</span>
                                    </div>
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${threatColors[comp.threat_level] || "bg-slate-100 text-slate-500"}`}>
                                        {comp.threat_level} Threat
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 mb-2">💡 {comp.core_strength}</p>
                                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                                    <p className="text-xs font-semibold text-slate-700 mb-1">{comp.bet_name}</p>
                                    <p className="text-xs text-slate-500">{comp.bet_description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Strategic Pillars */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <Layers className="h-5 w-5 text-teal-600" />
                        <h2 className="text-xl font-bold">Strategic Pillars</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.strategic_pillars.map((pillar, i) => (
                            <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                                <div className="flex items-center gap-2 mb-2">
                                    <Zap className="h-4 w-4 text-amber-500" />
                                    <h3 className="font-semibold">{pillar.pillar_name}</h3>
                                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{pillar.focus_area}</span>
                                </div>
                                <p className="text-xs text-slate-500 mb-3">{pillar.pillar_description}</p>
                                <div className="flex flex-wrap gap-1 mb-3">
                                    {pillar.key_technologies.map((t, ti) => (
                                        <span key={ti} className="text-[10px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full">{t}</span>
                                    ))}
                                </div>
                                <p className="text-xs text-slate-400 italic">"{pillar.cto_vision_statement}"</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Innovation Projects */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <Lightbulb className="h-5 w-5 text-teal-600" />
                        <h2 className="text-xl font-bold">Student Innovation Projects ⭐</h2>
                    </div>

                    {["Tier 1", "Tier 2", "Tier 3"].map(tier => {
                        const projects = data.innovx_projects.filter(p => p.tier_level === tier);
                        if (projects.length === 0) return null;
                        const config = tierConfig[tier];
                        return (
                            <div key={tier} className="mb-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className={`text-sm font-bold ${config.color}`}>{tier} — {config.label}</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {projects.map((proj, pi) => (
                                        <div key={pi} className={`rounded-xl p-5 border shadow-sm bg-white ${config.bg.replace('bg-', 'bg-opacity-10 ')}`}>
                                            <h4 className="font-semibold text-sm mb-2">{proj.project_name}</h4>
                                            <p className="text-xs text-slate-500 mb-3">{proj.problem_statement}</p>
                                            <div className="space-y-2 text-xs">
                                                <div><span className="font-medium">Use Case:</span> <span className="text-slate-500">{proj.primary_use_case}</span></div>
                                                <div><span className="font-medium text-green-600">Value:</span> <span className="text-slate-500">{proj.business_value}</span></div>
                                                <div className="flex items-center gap-1 text-slate-500">
                                                    <ArrowRight className="h-3 w-3" />
                                                    <span>{proj.user_journey_summary}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-1 mt-3">
                                                {[...proj.backend_technologies, ...proj.ai_ml_technologies].map((t, ti) => (
                                                    <span key={ti} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </section>
            </div>
        </Layout>
    );
};

