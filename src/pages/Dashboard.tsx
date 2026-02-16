import { useCompanies } from "@/hooks/useCompanies";
import { useHiringList } from "@/hooks/useHiringList";
import { useInnovXList } from "@/hooks/useInnovXList";
import { useNews } from "@/hooks/useNews"; // Import hook
import Layout from "@/components/Layout";
import { Building2, Users, Lightbulb, ArrowRight, TrendingUp, Search, Brain, GitCompare, Newspaper, ExternalLink } from "lucide-react"; // Added Newspaper, ExternalLink
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
    const { companies } = useCompanies();
    const { data: hiringData } = useHiringList();
    const { data: innovxData } = useInnovXList();
    const { articles, loading: newsLoading } = useNews(); // Use hook
    const navigate = useNavigate();

    const stats = [
        {
            label: "Total Companies",
            value: companies.length || 0,
            icon: Building2,
            color: "text-blue-600",
            bg: "bg-blue-50",
            desc: "Active profiles tracked"
        },
        {
            label: "Hiring Processes",
            value: hiringData.length || 0,
            icon: Users,
            color: "text-purple-600",
            bg: "bg-purple-50",
            desc: "Interview workflows mapped"
        },
        {
            label: "Innovation Profiles",
            value: innovxData.length || 0,
            icon: Lightbulb,
            color: "text-amber-600",
            bg: "bg-amber-50",
            desc: "Strategies analyzed"
        },
        {
            label: "Skill Data Points",
            value: "1.2k+",
            icon: TrendingUp,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            desc: "Across all companies"
        }
    ];

    const quickLinks = [
        {
            title: "Compare Companies",
            desc: "Side-by-side analysis of culture and benefits",
            icon: GitCompare,
            path: "/compare",
            color: "from-blue-500 to-cyan-500"
        },
        {
            title: "Check Skill Fit",
            desc: "AI-powered resume matching analysis",
            icon: Brain,
            path: "/skill-fit",
            color: "from-purple-500 to-pink-500"
        },
        {
            title: "Hiring Rounds",
            desc: "Detailed breakdown of interview stages",
            icon: Users,
            path: "/hiring-process",
            color: "from-orange-500 to-red-500"
        }
    ];

    return (
        <Layout>
            <div className="p-8 animate-in fade-in duration-500">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 mb-2">
                        Welcome to Intelliplace
                    </h1>
                    <p className="text-slate-500 text-lg">
                        Your central command for company intelligence, hiring insights, and skill analytics.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-xl ${stat.bg}`}>
                                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                                <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                            </div>
                            <h3 className="font-semibold text-slate-700">{stat.label}</h3>
                            <p className="text-xs text-slate-400 mt-1">{stat.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                    Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {quickLinks.map((link, idx) => (
                        <button
                            key={idx}
                            onClick={() => navigate(link.path)}
                            className="group relative overflow-hidden bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all text-left"
                        >
                            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${link.color} opacity-5 rounded-bl-full group-hover:scale-110 transition-transform duration-500`} />

                            <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center mb-4 text-white shadow-lg group-hover:scale-105 transition-transform`}>
                                <link.icon className="h-6 w-6" />
                            </div>

                            <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                                {link.title}
                            </h3>
                            <p className="text-slate-500 text-sm mb-4">
                                {link.desc}
                            </p>

                            <div className="flex items-center text-sm font-medium text-indigo-600 opacity-60 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all">
                                Launch Tool <ArrowRight className="ml-1 h-4 w-4" />
                            </div>
                        </button>
                    ))}
                </div>

                {/* Market News Section */}
                <div className="mb-12">
                    <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <Newspaper className="h-5 w-5 text-indigo-500" />
                        Market News & Trends
                    </h2>
                    {newsLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-64 bg-slate-50 rounded-xl animate-pulse border border-slate-100"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {articles.slice(0, 4).map((article, idx) => (
                                <a
                                    key={idx}
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all h-full"
                                >
                                    <div className="h-32 w-full overflow-hidden relative shrink-0">
                                        <img
                                            src={article.urlToImage || ""}
                                            alt={article.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                e.currentTarget.parentElement!.style.backgroundColor = '#f1f5f9'; // slate-100
                                            }}
                                        />
                                        <div className="absolute top-2 right-2">
                                            <span className="text-[10px] font-bold text-slate-700 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full border border-slate-200 shadow-sm">
                                                {article.source.name}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4 flex-1 flex flex-col">
                                        <h3 className="font-bold text-slate-800 text-sm mb-2 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
                                            {article.title}
                                        </h3>
                                        <p className="text-xs text-slate-500 line-clamp-3 mb-3 flex-1">
                                            {article.description}
                                        </p>
                                        <div className="flex items-center text-[10px] text-slate-400 mt-auto border-t border-slate-50 pt-2">
                                            <span>{new Date(article.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                            <ExternalLink className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500" />
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                {/* Featured Companies Preview or simple list */}
                <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-3xl p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Explore the Directory</h2>
                            <p className="text-indigo-200 max-w-lg">
                                Dive into our comprehensive database of companies to find detailed reports, hiring rounds, and innovation indices.
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-white text-indigo-900 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-lg flex items-center gap-2 whitespace-nowrap"
                        >
                            <Search className="h-5 w-5" />
                            Browse All Companies
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
