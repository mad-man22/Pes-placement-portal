import { InnovXData } from "@/types/innovx";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Users,
    Globe,
    Zap,
    ArrowUpRight,
    TrendingUp,
    ShieldAlert,
    Rocket,
    BrainCircuit
} from "lucide-react";

interface ResearchDashboardProps {
    data: InnovXData;
    onNavigate: (view: string) => void;
}

export const ResearchDashboard = ({ data, onNavigate }: ResearchDashboardProps) => {

    // Helper to get critical trends
    const criticalTrends = data.industry_trends
        .filter(t => t.strategic_importance === 'Critical')
        .slice(0, 3);

    // Helper to get high threats
    const highThreats = data.competitive_landscape
        .filter(c => c.threat_level === 'High')
        .slice(0, 3);

    // Helper to get top projects
    const topProjects = data.innovx_projects
        .filter(p => p.tier_level === 'Tier 1')
        .slice(0, 2);

    return (
        <div className="space-y-8">
            {/* Welcome / Hero */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-xl">
                <div className="absolute top-0 right-0 p-8 opacity-20">
                    <BrainCircuit className="w-64 h-64" />
                </div>
                <div className="relative z-10 p-8 md:p-10">
                    <div className="max-w-3xl space-y-4">
                        <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-md">
                            Enterprise Overview
                        </Badge>
                        <h1 className="text-4xl font-extrabold tracking-tight">
                            {data.innovx_master.company_name}
                        </h1>
                        <p className="text-lg text-indigo-100 leading-relaxed max-w-2xl">
                            {data.innovx_master.core_business_model}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                                <Globe className="w-4 h-4 text-blue-300" />
                                <span className="font-medium">{data.innovx_master.geographic_focus}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                                <Users className="w-4 h-4 text-purple-300" />
                                <span className="font-medium">{data.innovx_master.industry}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                                <Zap className="w-4 h-4 text-yellow-300" />
                                <span className="font-medium">{data.innovx_projects.length} Active Innovation Projects</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card onClick={() => onNavigate('overview')} className="bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900 cursor-pointer hover:shadow-md transition-all">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">Market Trends</CardTitle>
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.industry_trends.length}</div>
                        <p className="text-xs text-blue-600/80 dark:text-blue-300">{criticalTrends.length} Critical Shifts</p>
                    </CardContent>
                </Card>
                <Card onClick={() => onNavigate('projects')} className="bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-900 cursor-pointer hover:shadow-md transition-all">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-purple-900 dark:text-purple-100">Active Projects</CardTitle>
                        <Rocket className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.innovx_projects.length}</div>
                        <p className="text-xs text-purple-600/80 dark:text-purple-300">{topProjects.length} Tier-1 Initiatives</p>
                    </CardContent>
                </Card>
                <Card onClick={() => onNavigate('competition')} className="bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900 cursor-pointer hover:shadow-md transition-all">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-red-900 dark:text-red-100">Key Competitors</CardTitle>
                        <ShieldAlert className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.competitive_landscape.length}</div>
                        <p className="text-xs text-red-600/80 dark:text-red-300">{highThreats.length} High Threats</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Widgets Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column (2/3) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Critical Trends Widget */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-blue-500" />
                                Critical Market Shifts
                            </h3>
                            <Button variant="ghost" size="sm" onClick={() => onNavigate('overview')} className="text-blue-600 hover:text-blue-700">
                                View All <ArrowUpRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                        <div className="grid gap-4">
                            {criticalTrends.map((trend, idx) => (
                                <Card key={idx} className="hover:border-blue-200 transition-colors">
                                    <CardContent className="p-4 flex gap-4 items-start">
                                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0 font-bold text-blue-600">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-lg">{trend.trend_name}</h4>
                                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{trend.trend_description}</p>
                                            <div className="flex gap-2 mt-2">
                                                {trend.impact_areas.slice(0, 2).map((area, i) => (
                                                    <Badge key={i} variant="secondary" className="text-xs bg-slate-100 dark:bg-slate-800">{area}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Featured Projects Widget */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Rocket className="w-5 h-5 text-purple-500" />
                                Flagship Initiatives
                            </h3>
                            <Button variant="ghost" size="sm" onClick={() => onNavigate('projects')} className="text-purple-600 hover:text-purple-700">
                                View All <ArrowUpRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            {topProjects.map((project, idx) => (
                                <Card key={idx} className="group hover:shadow-lg transition-all border-purple-200/50">
                                    <CardHeader className="pb-3">
                                        <div className="flex justify-between items-start">
                                            <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50">{project.tier_level}</Badge>
                                        </div>
                                        <CardTitle className="text-lg group-hover:text-purple-700 transition-colors">{project.project_name}</CardTitle>
                                        <CardDescription className="line-clamp-2">{project.problem_statement}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-sm font-medium text-green-600 mb-2">Value: {project.business_value}</div>
                                        <div className="flex flex-wrap gap-1">
                                            {project.ai_ml_technologies.slice(0, 2).map((tech, i) => (
                                                <Badge key={i} variant="secondary" className="text-[10px]">{tech}</Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column (1/3) */}
                <div className="space-y-8">
                    {/* Threat Radar */}
                    <div className="bg-red-50/50 dark:bg-red-900/10 rounded-2xl p-6 border border-red-100 dark:border-red-900/20">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-red-900 dark:text-red-100 flex items-center gap-2">
                                <ShieldAlert className="w-5 h-5" /> Threat Radar
                            </h3>
                        </div>
                        <div className="space-y-3">
                            {highThreats.map((competitor, idx) => (
                                <div key={idx} className="bg-white dark:bg-black/40 p-3 rounded-xl border border-red-100/50 shadow-sm">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-semibold text-sm">{competitor.competitor_name}</span>
                                        <Badge variant="destructive" className="text-[10px] h-5">High</Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-2">{competitor.market_positioning}</p>
                                    <div className="text-xs font-medium text-red-600 border-t border-red-100 dark:border-red-900/30 pt-2 mt-2">
                                        Bet: {competitor.bet_name}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="link" onClick={() => onNavigate('competition')} className="w-full mt-4 text-red-600 h-auto p-0 text-sm">
                            View Full Landscape
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
