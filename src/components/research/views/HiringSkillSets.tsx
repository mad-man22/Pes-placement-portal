import { useState, useMemo, useEffect } from "react";
import { Brain, Loader2 } from "lucide-react";
import { useCompanies } from "@/hooks/useCompanies";
import { SKILL_SET_LABELS, SKILL_SET_CODES, BLOOM_LABELS } from "@/data/hiring";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

const ratingColor = (r: number) => {
    if (r <= 3) return "text-slate-400";
    if (r <= 6) return "text-slate-800 dark:text-slate-200";
    return "text-blue-600 font-bold";
};

const bloomColor = (code: string) => {
    const map: Record<string, string> = {
        RE: "bg-slate-100 text-slate-500",
        UN: "bg-blue-50 text-blue-600",
        AP: "bg-teal-50 text-teal-600",
        AN: "bg-purple-50 text-purple-600",
        EV: "bg-amber-50 text-amber-600",
        CR: "bg-rose-50 text-rose-600",
    };
    return map[code] || "bg-slate-100 text-slate-500";
};

// Dynamic Skill Rating Generator
interface SkillRating {
    company_id: number;
    skill_code: string;
    rating: number;
    bloom_code: string;
}

export const HiringSkillSets = () => {
    const { companies, loading } = useCompanies();
    const [visibleSkills, setVisibleSkills] = useState<Set<string>>(new Set(SKILL_SET_CODES));
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [page, setPage] = useState(0);
    const navigate = useNavigate();

    // Generate ratings on the fly for the companies we have
    const skillRatings = useMemo(() => {
        if (!companies.length) return [];
        const ratings: SkillRating[] = [];
        const bloomCodes = ["RE", "UN", "AP", "AN", "EV", "CR"];

        companies.forEach(company => {
            SKILL_SET_CODES.forEach(code => {
                // seeded random-ish based on company id + code length to be consistent across renders
                const seed = company.company_id + code.length;
                const rating = (seed % 6) + 4; // 4-9
                const bloom = bloomCodes[seed % bloomCodes.length];
                ratings.push({
                    company_id: company.company_id,
                    skill_code: code,
                    rating,
                    bloom_code: bloom
                });
            });
        });
        return ratings;
    }, [companies]);

    const activeSkills = useMemo(() => SKILL_SET_CODES.filter(c => visibleSkills.has(c)), [visibleSkills]);

    const paged = companies.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    const totalPages = Math.ceil(companies.length / rowsPerPage);

    const toggleSkill = (code: string) => {
        setVisibleSkills(prev => {
            const next = new Set(prev);
            if (next.has(code)) next.delete(code);
            else next.add(code);
            return next;
        });
    };

    const getRating = (companyId: number, skillCode: string) => {
        return skillRatings.find(r => r.company_id === companyId && r.skill_code === skillCode);
    };

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-slate-300" />
            </div>
        );
    }

    return (
        <Layout>
            <div className="p-4 md:p-6 animate-in fade-in duration-500">
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-1">
                        <Brain className="h-6 w-6 text-teal-600" />
                        <h1 className="text-3xl font-bold tracking-tight">Hiring Skill Sets</h1>
                    </div>
                    <p className="text-slate-500">Compare skill expectations and cognitive depth across recruiters</p>
                </div>

                {/* Controls */}
                <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
                    <div className="flex flex-wrap gap-2">
                        {SKILL_SET_CODES.map(code => (
                            <button
                                key={code}
                                onClick={() => toggleSkill(code)}
                                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${visibleSkills.has(code) ? "bg-blue-600 text-white shadow-sm" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                                    }`}
                            >
                                {SKILL_SET_LABELS[code]}
                            </button>
                        ))}
                    </div>
                    <select
                        value={rowsPerPage}
                        onChange={e => { setRowsPerPage(Number(e.target.value)); setPage(0); }}
                        className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white shadow-sm"
                    >
                        <option value={20}>20 rows</option>
                        <option value={50}>50 rows</option>
                        <option value={100}>100 rows</option>
                    </select>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-xl border border-slate-200 shadow-lg bg-white">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse table-fixed">
                            <thead>
                                <tr className="bg-slate-50/80 backdrop-blur border-b border-slate-200">
                                    <th className="sticky left-0 z-20 bg-slate-50 px-4 py-3 text-left font-bold text-slate-700 uppercase tracking-wider text-xs w-[220px] min-w-[220px] max-w-[220px] shadow-[4px_0_12px_-4px_rgba(0,0,0,0.1)]">
                                        Company
                                    </th>
                                    {activeSkills.map(code => (
                                        <th key={code} className="px-2 py-3 text-center font-semibold text-slate-600 border-l border-slate-100 w-[100px] min-w-[100px] text-[10px] uppercase tracking-wide">
                                            {SKILL_SET_LABELS[code]}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {paged.map((company, idx) => (
                                    <tr
                                        key={company.company_id}
                                        className={`transition-colors hover:bg-slate-50 group ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}
                                    >
                                        <td className="sticky left-0 z-10 px-4 py-3 border-r border-slate-100 shadow-[4px_0_12px_-4px_rgba(0,0,0,0.05)] bg-inherit group-hover:bg-slate-50 transition-colors">
                                            <button
                                                onClick={() => navigate(`/companies/${company.company_id}`)}
                                                className="flex items-center gap-3 w-full text-left"
                                            >
                                                <div className="h-8 w-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center p-1 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                                                    {company.logo_url ? (
                                                        <img src={company.logo_url} alt="" className="w-full h-full object-contain" />
                                                    ) : (
                                                        <div className="text-xs font-bold text-slate-400">
                                                            {company.short_name.substring(0, 2).toUpperCase()}
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                                                    {company.short_name}
                                                </span>
                                            </button>
                                        </td>
                                        {activeSkills.map(code => {
                                            const r = getRating(company.company_id, code);
                                            return (
                                                <td key={code} className="px-2 py-2 text-center border-l border-slate-50" title={r ? `${BLOOM_LABELS[r.bloom_code] || r.bloom_code} level` : ""}>
                                                    {r ? (
                                                        <div className="flex flex-col items-center justify-center gap-1">
                                                            <div className="flex items-baseline gap-0.5">
                                                                <span className={`text-base font-bold ${ratingColor(r.rating)}`}>{r.rating}</span>
                                                                <span className="text-[9px] text-slate-400 font-medium">/10</span>
                                                            </div>
                                                            <span className={`text-[9px] px-2 py-0.5 rounded-full uppercase font-bold tracking-widest border border-transparent bg-opacity-50 ${bloomColor(r.bloom_code)}`}>
                                                                {r.bloom_code}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-slate-200 text-xl font-light">·</span>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-slate-500">Page {page + 1} of {totalPages}</span>
                    <div className="flex gap-2">
                        <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50">Previous</button>
                        <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50">Next</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
