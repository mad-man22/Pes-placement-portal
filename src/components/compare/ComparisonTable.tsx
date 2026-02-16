import { Company } from "@/data/companyData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2, XCircle, CheckCircle2 } from "lucide-react";

interface ComparisonTableProps {
    companies: Company[];
}

export const ComparisonTable = ({ companies }: ComparisonTableProps) => {
    if (!companies || companies.length === 0) return null;

    // Helper to join array data
    const join = <T,>(arr: T[] | undefined, key: keyof T): string => {
        if (!arr) return "";
        return arr.map(item => String(item[key])).filter(Boolean).join("; ");
    };

    const renderSection = (title: string, rows: { label: string; accessor: (c: Company) => React.ReactNode }[], colorClass: string, icon: React.ReactNode) => (
        <>
            <TableRow className={`border-b border-primary/10 ${colorClass}`}>
                <TableCell colSpan={companies.length + 1} className="py-4 px-6 relative overflow-hidden group/section">
                    <div className="relative flex items-center gap-2">
                        <span className={`p-1.5 rounded-lg ${colorClass} bg-opacity-20 text-current`}>
                            {icon}
                        </span>
                        <span className={`font-bold text-lg tracking-tight ${colorClass} text-current`}>
                            {title}
                        </span>
                    </div>
                </TableCell>
            </TableRow>
            {rows.map((row, idx) => (
                <TableRow key={`${title}-${idx}`} className="group transition-all hover:bg-muted/40 border-b border-dashed border-border/40 last:border-0 relative">
                    <TableCell className="font-medium text-sm md:text-base py-4 px-6 text-muted-foreground bg-muted/5 w-[200px] min-w-[200px] border-r border-border/30">
                        {row.label}
                    </TableCell>
                    {companies.map((company, cIdx) => (
                        <TableCell key={cIdx} className="align-top py-4 px-6 text-sm md:text-base relative">
                            {/* Hover highlight for cell */}
                            <div className="absolute inset-0 bg-current opacity-0 group-hover:opacity-[0.02] transition-opacity pointer-events-none" style={{ color: "var(--foreground)" }} />

                            <span className={title === "Financials" ? "font-mono font-medium tracking-tight text-foreground/90" : "font-normal text-foreground/80 group-hover:text-foreground transition-colors"}>
                                {row.accessor(company) || <span className="text-muted-foreground/30 text-lg select-none">--</span>}
                            </span>
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    );

    return (
        <div className="relative rounded-2xl mt-8 overflow-hidden bg-white/60 dark:bg-black/40 backdrop-blur-2xl shadow-2xl border border-white/20 dark:border-white/10 ring-1 ring-black/5">

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader className="sticky top-0 z-20 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-border shadow-sm">
                        <TableRow className="hover:bg-transparent border-none">
                            <TableHead className="w-[200px] min-w-[200px] bg-transparent p-6 align-bottom">
                                <span className="text-2xl font-bold text-foreground tracking-tight">Metrics</span>
                            </TableHead>
                            {companies.map((company, idx) => (
                                <TableHead key={idx} className="min-w-[280px] bg-transparent p-6 align-bottom border-l border-border/30 first:border-l-0">
                                    <div className="flex flex-col items-center text-center gap-4">
                                        <div className="relative group/logo">
                                            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-purple-500/20 to-blue-500/20 rounded-full blur-xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500" />
                                            <div className="h-24 w-24 flex items-center justify-center rounded-2xl bg-white dark:bg-zinc-900 p-3 shadow-lg ring-1 ring-black/5 relative z-10 transition-transform duration-300 group-hover/logo:scale-110 ease-out">
                                                {company.logos?.[0]?.logo_url ? (
                                                    <img src={company.logos[0].logo_url} alt={company.name} className="h-full w-full object-contain" />
                                                ) : (
                                                    <Building2 className="h-10 w-10 text-muted-foreground" />
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-xl leading-tight text-foreground mb-2">{company.name}</div>
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 shadow-sm">
                                                {company.category || company.nature_of_company}
                                            </span>
                                        </div>
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {renderSection("Overview", [
                            { label: "Headquarters", accessor: (c) => c.headquarters_address },
                            { label: "Category", accessor: (c) => c.category },
                            { label: "Year Founded", accessor: (c) => c.incorporation_year },
                            { label: "Countries Operating", accessor: (c) => join(c.operating_countries, 'country_name') },
                        ], "text-indigo-600 dark:text-indigo-400", <Building2 className="h-4 w-4" />)}

                        {renderSection("Financials", [
                            { label: "Annual Revenue", accessor: (c) => c.financials?.[0]?.annual_revenue },
                            { label: "YoY Growth", accessor: (c) => c.financials?.[0]?.yoy_growth_rate },
                            { label: "Profits", accessor: (c) => c.financials?.[0]?.annual_profit },
                            { label: "Market Share", accessor: (c) => c.business?.[0]?.market_share_percentage },
                        ], "text-emerald-600 dark:text-emerald-400", <CheckCircle2 className="h-4 w-4" />)}

                        {renderSection("Compensation & Benefits", [
                            { label: "Fixed vs Variable", accessor: (c) => c.compensation?.[0]?.fixed_vs_variable_pay },
                            { label: "Bonus Predictability", accessor: (c) => c.compensation?.[0]?.bonus_predictability },
                            { label: "ESOPs / Incentives", accessor: (c) => join(c.compensation?.[0]?.esops_incentives, 'esops_incentives') },
                            { label: "Wellness Benefits", accessor: (c) => join(c.compensation?.[0]?.lifestyle_benefits, 'lifestyle_benefits') },
                        ], "text-amber-600 dark:text-amber-400", <Building2 className="h-4 w-4" />)}

                        {renderSection("Work & Culture", [
                            { label: "Work Culture", accessor: (c) => join(c.culture?.[0]?.work_culture_summary, 'work_culture_summary') },
                            { label: "Remote Policy", accessor: (c) => c.logistics?.[0]?.remote_policy_details },
                            { label: "Typical Hours", accessor: (c) => c.logistics?.[0]?.typical_hours },
                            { label: "Weekend Work", accessor: (c) => c.logistics?.[0]?.weekend_work },
                            { label: "Manager Quality", accessor: (c) => c.culture?.[0]?.manager_quality },
                            { label: "Psychological Safety", accessor: (c) => c.culture?.[0]?.psychological_safety },
                        ], "text-rose-600 dark:text-rose-400", <Building2 className="h-4 w-4" />)}

                        {renderSection("Career Growth", [
                            { label: "Learning Culture", accessor: (c) => join(c.talent_growth?.[0]?.learning_culture, 'learning_culture') },
                            { label: "Internal Mobility", accessor: (c) => c.talent_growth?.[0]?.internal_mobility },
                            { label: "Promotion Clarity", accessor: (c) => join(c.talent_growth?.[0]?.promotion_clarity, 'promotion_clarity') },
                            { label: "Exit Opportunities", accessor: (c) => join(c.talent_growth?.[0]?.exit_opportunities, 'exit_opportunities') },
                        ], "text-violet-600 dark:text-violet-400", <Building2 className="h-4 w-4" />)}

                        {renderSection("Tech & Operations", [
                            { label: "Tech Stack", accessor: (c) => join(c.technologies?.[0]?.tech_stack, 'tech_stack') },
                            { label: "Automation Level", accessor: (c) => c.talent_growth?.[0]?.automation_level },
                            { label: "Innovation", accessor: (c) => c.business?.[0]?.innovation_roadmap },
                            {
                                label: "Employee Size", accessor: (c) => {
                                    const size = c.employee_size;
                                    if (!size) return "N/A";
                                    if (/^[\d,]+$/.test(size)) return parseInt(size.replace(/,/g, "")).toLocaleString() + " employees";
                                    if (size.toLowerCase().includes("employee")) return size;
                                    return size + " employees";
                                }
                            },
                        ], "text-cyan-600 dark:text-cyan-400", <Building2 className="h-4 w-4" />)}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
