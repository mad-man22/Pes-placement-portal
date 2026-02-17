import { useInnovX } from "@/hooks/useInnovX";
import { TrendingUp, Shield, Lightbulb, Zap, Layers, ArrowRight, Loader2, AlertCircle } from "lucide-react"; // Removed Sparkles
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { DetailHeader } from "@/components/company/DetailHeader"; // Import

interface CompanyResearchDetailProps {
    companyId: string;
}

// Muted, professional indicators
const importanceColors: Record<string, string> = {
    Critical: "bg-red-50 text-red-700 border border-red-100",
    High: "bg-amber-50 text-amber-700 border border-amber-100",
    Medium: "bg-blue-50 text-blue-700 border border-blue-100",
};

const threatColors: Record<string, string> = {
    High: "bg-red-50 text-red-700 border border-red-100",
    Medium: "bg-amber-50 text-amber-700 border border-amber-100",
    Low: "bg-green-50 text-green-700 border border-green-100",
};

const tierConfig: Record<string, { label: string; color: string; bg: string }> = {
    "Tier 1": { label: "Foundational Innovation", color: "text-primary", bg: "bg-secondary/40 border-border" },
    "Tier 2": { label: "Advanced Innovation", color: "text-primary", bg: "bg-secondary/40 border-border" },
    "Tier 3": { label: "Breakthrough Innovation", color: "text-primary", bg: "bg-secondary/40 border-border" },
};

export const CompanyResearchDetail = () => {
    const { companyId } = useParams<{ companyId: string }>();
    const { data, loading, error } = useInnovX(companyId ? parseInt(companyId) : 0);

    console.log("CompanyDetail Debug:", { companyId, loading, error, data });


    if (loading) {
        return (
            <Layout>
                <div className="flex h-64 items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                </div>
            </Layout>
        );
    }

    if (error || !data) {
        return (
            <Layout>
                <div className="flex h-64 flex-col items-center justify-center text-destructive">
                    <AlertCircle className="w-8 h-8 mb-2" />
                    <p>Failed to load company research data. {error}</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout showBackButton={true}>
            <div className="p-8 animate-in fade-in duration-500 space-y-12 max-w-7xl mx-auto">
                {/* Headerr with DetailHeader - passing refined gradient prop (or we should update DetailHeader to not need it/ignore it) */}
                <DetailHeader
                    title={data.innovx_master.company_name}
                    subtitle="Research, Innovation Strategies & Competitive Analysis"
                    // @ts-ignore - Assuming logo comes from master data join or similar logic
                    logoUrl={data.innovx_master?.company?.logo_url || data.innovx_master?.logo_url}
                    tags={["InnovX Report", `${data.industry_trends?.length || 0} Trends`]}
                    gradient="from-slate-100 to-slate-50" // Neutral gradient
                    stats={[
                        { label: "Strategic Pillars", value: data.strategic_pillars?.length || 0, icon: Layers, color: "text-foreground" },
                        { label: "Innovation Projects", value: data.innovx_projects?.length || 0, icon: Lightbulb, color: "text-foreground" },
                        { label: "Key Competitors", value: data.competitive_landscape?.length || 0, icon: Shield, color: "text-foreground" }
                    ]}
                />

                {/* Industry Trends */}
                <section>
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-bold text-foreground">Industry Trends</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data.industry_trends.map((trend, i) => (
                            <div key={i} className="bg-card p-5 rounded-lg border border-border shadow-sm hover:shadow-md transition-all">
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="font-semibold text-sm leading-tight text-foreground">{trend.trend_name}</h3>
                                    <span className={`text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-sm font-medium flex-shrink-0 ml-2 ${importanceColors[trend.strategic_importance] || "bg-secondary text-muted-foreground"}`}>
                                        {trend.strategic_importance}
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground mb-4 leading-relaxed line-clamp-3">{trend.trend_description}</p>
                                <div className="flex flex-wrap gap-1 mb-2">
                                    {trend.impact_areas.map((a, ai) => (
                                        <span key={ai} className="text-[10px] bg-secondary text-secondary-foreground px-2 py-0.5 rounded border border-border">{a}</span>
                                    ))}
                                </div>
                                <p className="text-[10px] text-muted-foreground mt-2 border-t border-border pt-2">⏱ {trend.time_horizon_years} year horizon</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Competitive Landscape */}
                <section>
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
                        <Shield className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-bold text-foreground">Competitive Landscape</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.competitive_landscape.map((comp, i) => (
                            <div key={i} className="bg-card p-5 rounded-lg border border-border shadow-sm">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h3 className="font-semibold text-foreground">{comp.competitor_name}</h3>
                                        <span className="text-xs text-muted-foreground">{comp.competitor_type} Competitor</span>
                                    </div>
                                    <span className={`text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-sm font-medium ${threatColors[comp.threat_level] || "bg-secondary text-muted-foreground"}`}>
                                        {comp.threat_level} Threat
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground mb-3">💡 {comp.core_strength}</p>
                                <div className="bg-secondary/30 rounded p-3 border border-border">
                                    <p className="text-xs font-semibold text-foreground mb-1">{comp.bet_name}</p>
                                    <p className="text-xs text-muted-foreground">{comp.bet_description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Strategic Pillars */}
                <section>
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
                        <Layers className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-bold text-foreground">Strategic Pillars</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.strategic_pillars.map((pillar, i) => (
                            <div key={i} className="bg-card p-5 rounded-lg border border-border shadow-sm">
                                <div className="flex items-center gap-2 mb-3">
                                    <Zap className="h-4 w-4 text-foreground/70" />
                                    <h3 className="font-semibold text-foreground">{pillar.pillar_name}</h3>
                                    <span className="text-[10px] bg-secondary text-secondary-foreground px-2 py-0.5 rounded ml-auto">{pillar.focus_area}</span>
                                </div>
                                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{pillar.pillar_description}</p>
                                <div className="flex flex-wrap gap-1 mb-4">
                                    {pillar.key_technologies.map((t, ti) => (
                                        <span key={ti} className="text-[10px] bg-white border border-border text-muted-foreground px-2 py-0.5 rounded">{t}</span>
                                    ))}
                                </div>
                                <p className="text-xs text-muted-foreground/80 italic pl-3 border-l-2 border-primary/20">"{pillar.cto_vision_statement}"</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Innovation Projects */}
                <section>
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
                        <Lightbulb className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-bold text-foreground">Student Innovation Projects</h2>
                    </div>

                    {["Tier 1", "Tier 2", "Tier 3"].map(tier => {
                        const projects = data.innovx_projects.filter(p => p.tier_level === tier);
                        if (projects.length === 0) return null;
                        const config = tierConfig[tier];
                        return (
                            <div key={tier} className="mb-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className={`text-sm font-bold text-foreground`}>{tier} — {config.label}</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {projects.map((proj, pi) => (
                                        <div key={pi} className={`rounded-lg p-5 border shadow-sm ${config.bg}`}>
                                            <h4 className="font-semibold text-sm mb-2 text-foreground">{proj.project_name}</h4>
                                            <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{proj.problem_statement}</p>
                                            <div className="space-y-2 text-xs">
                                                <div className="flex justify-between border-b border-border/50 pb-1">
                                                    <span className="font-medium text-muted-foreground">Use Case</span>
                                                    <span className="text-foreground max-w-[60%] text-right truncate">{proj.primary_use_case}</span>
                                                </div>
                                                <div className="flex justify-between border-b border-border/50 pb-1">
                                                    <span className="font-medium text-muted-foreground">Value</span>
                                                    <span className="text-foreground max-w-[60%] text-right truncate">{proj.business_value}</span>
                                                </div>
                                                <div className="flex items-start gap-2 pt-1 text-muted-foreground">
                                                    <ArrowRight className="h-3 w-3 mt-0.5 shrink-0" />
                                                    <span className="leading-tight">{proj.user_journey_summary}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-1 mt-4">
                                                {[...proj.backend_technologies, ...proj.ai_ml_technologies].map((t, ti) => (
                                                    <span key={ti} className="text-[10px] bg-white text-muted-foreground px-2 py-0.5 rounded border border-border/50">{t}</span>
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

