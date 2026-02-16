import { useHiringData } from "@/hooks/useHiringData";
import { Loader2, GitBranch, CheckCircle2, Search, Briefcase, Users, Coins } from "lucide-react"; // Added Icons
import { ROUND_ICONS, SKILL_SET_LABELS } from "@/data/hiring";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { DetailHeader } from "@/components/company/DetailHeader"; // Import

export const CompanyHiringRounds = () => {
    const { companyId } = useParams<{ companyId: string }>();
    const { data, loading, error } = useHiringData(companyId ? parseInt(companyId) : 0);

    if (loading) {
        return (
            <Layout>
                <div className="flex h-64 items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-slate-300" />
                </div>
            </Layout>
        );
    }

    if (!data || !data.job_role_details || data.job_role_details.length === 0) {
        return (
            <Layout>
                <div className="text-center py-16 text-slate-500">
                    <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-30" />
                    <p className="text-lg">No hiring process data available for this company</p>
                </div>
            </Layout>
        );
    }

    // Calculate aggregated stats
    const totalRoles = data.job_role_details.length;
    const avgRounds = Math.round(data.job_role_details.reduce((acc, r) => acc + (r.hiring_rounds?.length || 0), 0) / totalRoles) || 0;
    const maxCtc = Math.max(...data.job_role_details.map(r => r.ctc_or_stipend));

    return (
        <Layout showBackButton={true}>
            <div className="p-8 animate-in fade-in duration-500 space-y-10">
                {/* Enhanced Header */}
                <DetailHeader
                    title={data.company_name}
                    subtitle="Detailed Hiring Process & Interview Rounds Breakdown"
                    // @ts-ignore - Assuming logo might be joined or we fetch separately, currently using fallback
                    logoUrl={data.company?.logo_url}
                    tags={["Hiring Analysis", `${totalRoles} Roles`]}
                    gradient="from-blue-500/10 to-indigo-500/10"
                    stats={[
                        { label: "Active Roles", value: totalRoles, icon: Briefcase, color: "text-blue-500" },
                        { label: "Avg Rounds", value: avgRounds, icon: GitBranch, color: "text-indigo-500" },
                        { label: "Max Package", value: `₹${(maxCtc / 100000).toFixed(1)} LPA`, icon: Coins, color: "text-green-500" }
                    ]}
                />

                {/* Job Roles */}
                {data.job_role_details.map((role, idx) => (
                    <div key={idx} className="space-y-6">
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">{role.role_title}</h2>
                                    <span className="inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                                        {role.role_category}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-green-600">
                                        ₹{(role.ctc_or_stipend / 100000).toFixed(1)} LPA
                                    </div>
                                    <p className="text-xs text-slate-500">{role.compensation}</p>
                                </div>
                            </div>
                            <p className="text-sm text-slate-600 mb-4">{role.job_description}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div className="p-3 bg-white rounded-lg border border-slate-200">
                                    <span className="font-semibold block mb-1">Benefits</span>
                                    <span className="text-slate-500">{role.benefits_summary}</span>
                                </div>
                                <div className="p-3 bg-white rounded-lg border border-slate-200">
                                    <span className="font-semibold block mb-1">Bonus</span>
                                    <span className="text-slate-500">{role.bonus}</span>
                                </div>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="relative pl-8 border-l-2 border-slate-200 space-y-8">
                            {role.hiring_rounds.map((round, rIdx) => (
                                <div key={rIdx} className="relative">
                                    {/* Dot */}
                                    <div className="absolute -left-[41px] top-0 h-5 w-5 rounded-full bg-white border-4 border-slate-300" />

                                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">{ROUND_ICONS[round.round_category] || "📋"}</span>
                                                <div>
                                                    <h3 className="font-bold text-slate-900">Round {round.round_number}: {round.round_name}</h3>
                                                    <div className="flex gap-2 mt-1">
                                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-500">{round.assessment_mode}</span>
                                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-500">{round.evaluation_type}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6 grid gap-6 md:grid-cols-2">
                                            {round.skill_sets.map((skill, sIdx) => (
                                                <div key={sIdx} className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <Search className="h-4 w-4 text-blue-500" />
                                                        <span className="font-semibold text-sm">{SKILL_SET_LABELS[skill.skill_set_code] || skill.skill_set_code}</span>
                                                    </div>
                                                    <div className="text-sm text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100 italic">
                                                        "{skill.typical_questions}"
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
};
