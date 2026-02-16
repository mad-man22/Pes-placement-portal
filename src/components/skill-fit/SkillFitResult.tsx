import { AnalysisResult, SuggestionResult } from "@/lib/gemini";
import { Company } from "@/data/companyData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, TrendingUp, RefreshCcw, Star, Building, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SkillFitResultProps {
    result?: AnalysisResult;
    suggestionResult?: SuggestionResult;
    company?: Company;
    onReset: () => void;
}

export const SkillFitResult = ({ result, suggestionResult, company, onReset }: SkillFitResultProps) => {
    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-500";
        if (score >= 60) return "text-yellow-500";
        return "text-red-500";
    };

    // 1. Single Company Analysis View
    if (result && company) {
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
                    {/* Score Card - Hero Feature */}
                    <Card className="md:col-span-1 lg:col-span-1 border-none bg-white/30 dark:bg-black/30 backdrop-blur-2xl ring-1 ring-white/20 shadow-2xl overflow-hidden relative group">
                        {/* Premium Gradient Overlay with Pulse - Softened */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-300/10 via-purple-300/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="absolute inset-0 bg-primary/5 animate-pulse rounded-full blur-3xl scale-150 opacity-20 transform translate-x-1/2 translate-y-1/2"></div>

                        <CardHeader className="relative z-10 pb-2">
                            <CardTitle className="text-center text-lg font-bold text-foreground/80 tracking-wide uppercase text-xs">Match Confidence</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center py-6 relative z-10">
                            <div className="relative flex items-center justify-center w-56 h-56 transition-transform hover:scale-105 duration-500">
                                {/* Radiant Glow - Pulsing */}
                                <div className={`absolute inset-0 rounded-full blur-3xl opacity-40 animate-pulse ${getScoreColor(result.matchScore).replace('text-', 'bg-')}`}></div>

                                <svg className="transform -rotate-90 w-48 h-48 drop-shadow-2xl" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="45" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-muted-foreground/10" />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        fill="transparent"
                                        stroke="currentColor"
                                        strokeWidth="5"
                                        strokeDasharray={`${2 * Math.PI * 45}`}
                                        strokeDashoffset={`${2 * Math.PI * 45 * (1 - result.matchScore / 100)}`}
                                        className={`${getScoreColor(result.matchScore)} transition-all duration-1000 ease-out`}
                                        strokeLinecap="round"
                                    />
                                </svg>

                                <div className="absolute inset-0 flex items-center justify-center flex-col">
                                    <span className={`text-6xl font-black tracking-tighter ${getScoreColor(result.matchScore)} drop-shadow-sm`}>
                                        {result.matchScore}%
                                    </span>
                                    <span className="text-xs font-medium text-muted-foreground mt-1 uppercase tracking-widest">Fit Score</span>
                                </div>
                            </div>
                            <div className="mt-6 text-center">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Analyzing Feature Fit for</p>
                                <h3 className="text-2xl font-bold text-foreground tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                                    {company.basics.companyName}
                                </h3>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Breakdown - Masonry Style Grid */}
                    <div className="md:col-span-2 lg:col-span-3 grid gap-6 grid-cols-1 md:grid-cols-2">
                        {/* Matching Skills */}
                        <Card className="border-none bg-white/40 dark:bg-black/20 backdrop-blur-md shadow-lg ring-1 ring-white/10 transition-all">
                            <CardHeader className="pb-3 border-b border-white/5">
                                <CardTitle className="text-lg flex items-center gap-3">
                                    <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                                        <CheckCircle2 className="h-5 w-5" />
                                    </div>
                                    Matching Skills
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="flex flex-wrap gap-2">
                                    {result.matchingSkills.length > 0 ? (
                                        result.matchingSkills.map((skill, i) => (
                                            <span
                                                key={skill}
                                                className="px-3 py-1.5 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-sm font-semibold border border-green-500/20 shadow-sm transition-transform cursor-default"
                                                style={{ animationDelay: `${i * 100}ms` }}
                                            >
                                                {skill}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-sm text-muted-foreground italic">No direct matches found yet.</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Missing Skills */}
                        <Card className="border-none bg-white/40 dark:bg-black/20 backdrop-blur-md shadow-lg ring-1 ring-white/10 transition-all">
                            <CardHeader className="pb-3 border-b border-white/5">
                                <CardTitle className="text-lg flex items-center gap-3">
                                    <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
                                        <AlertCircle className="h-5 w-5" />
                                    </div>
                                    Growth Opportunities
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="space-y-3">
                                    {result.missingSkills.length > 0 ? (
                                        result.missingSkills.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="group flex items-center justify-between p-3 rounded-lg bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 transition-colors"
                                            >
                                                <span className="font-medium text-sm text-red-600 dark:text-red-400">
                                                    {item.skill}
                                                </span>
                                                {item.resourceUrl && (
                                                    <a
                                                        href={item.resourceUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/50 dark:bg-white/10 text-xs font-semibold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 hover:bg-blue-500/10"
                                                    >
                                                        Learn Now <ExternalLink className="h-3 w-3" />
                                                    </a>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/10 text-center">
                                            <p className="text-sm font-medium text-green-600">Perfect Fit! No major gaps.</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recommendations - Full Width */}
                        <Card className="md:col-span-2 border-none bg-gradient-to-r from-blue-500/5 to-purple-500/5 backdrop-blur-md shadow-lg ring-1 ring-white/10">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-indigo-500" />
                                    AI Career Insight
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-foreground/80 leading-relaxed font-medium">
                                    "{result.recommendation}"
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="border-none bg-white/20 dark:bg-black/20 backdrop-blur-md">
                        <CardHeader>
                            <CardTitle className="text-lg text-green-600 flex items-center gap-2">
                                <Star className="h-4 w-4" /> Validated Strengths
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="grid gap-2">
                                {result.strengths.map((s, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-2 rounded-md hover:bg-white/5 transition-colors">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="border-none bg-white/20 dark:bg-black/20 backdrop-blur-md">
                        <CardHeader>
                            <CardTitle className="text-lg text-amber-600 flex items-center gap-2">
                                <Building className="h-4 w-4" /> Potential Gaps
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="grid gap-2">
                                {result.gaps.map((s, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-2 rounded-md hover:bg-white/5 transition-colors">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex justify-center pt-8 pb-8">
                    <Button onClick={onReset} variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all shadow-xl hover:scale-105">
                        <RefreshCcw className="mr-2 h-5 w-5" />
                        Analyze Another Company
                    </Button>
                </div>
            </div>
        );
    }

    // 2. Suggestion Results View
    if (suggestionResult) {
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        Top Company Matches
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Based on your skills, here are the top companies you should consider applying to.
                    </p>
                </div>

                <div className="grid gap-6">
                    {suggestionResult.rankedMatches.map((match, idx) => (
                        <Card key={idx} className="group relative overflow-hidden transition-all duration-300 border-0 ring-1 ring-black/5 hover:shadow-xl hover:-translate-y-1">
                            {/* Gradient Border Line - Ultra Light Pastel */}
                            <div className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-br from-indigo-300/10 via-purple-300/10 to-pink-300/10 -z-10 opacity-70 group-hover:opacity-100 group-hover:from-indigo-200 group-hover:via-purple-200 group-hover:to-pink-200 transition-all duration-500" />

                            <div className="flex flex-col md:flex-row relative z-10 bg-white/40 dark:bg-black/40 backdrop-blur-md">
                                <div className="p-6 md:w-64 bg-muted/30 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r">
                                    <div className={`text-4xl font-bold mb-2 ${getScoreColor(match.matchScore)}`}>
                                        {match.matchScore}%
                                    </div>
                                    <div className="font-semibold text-lg">{match.companyName}</div>
                                    {idx === 0 && (
                                        <span className="mt-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full flex items-center gap-1">
                                            <Star className="h-3 w-3 fill-yellow-800" /> Top Choice
                                        </span>
                                    )}
                                </div>
                                <div className="p-6 flex-1 space-y-4">
                                    <div>
                                        <h4 className="font-semibold mb-1 flex items-center gap-2">
                                            <Building className="h-4 w-4 text-primary" />
                                            Why this works
                                        </h4>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {match.reason}
                                        </p>
                                    </div>

                                    {match.missingSkills && match.missingSkills.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold mb-2 text-sm text-red-600">Skills to Add</h4>
                                            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                                                {match.missingSkills.map((item, i) => (
                                                    <div key={i} className="flex items-center justify-between gap-2 px-3 py-2 bg-red-50 rounded border border-red-100 text-xs">
                                                        <span className="font-medium text-red-700 truncate" title={item.skill}>
                                                            {item.skill}
                                                        </span>
                                                        {item.resourceUrl && (
                                                            <a
                                                                href={item.resourceUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                title={`Learn at ${item.resourceName}`}
                                                                className="text-blue-600 hover:text-blue-800 shrink-0"
                                                            >
                                                                <ExternalLink className="h-3 w-3" />
                                                            </a>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        Career Advisor Summary
                    </h3>
                    <p className="text-sm text-muted-foreground italic">
                        {suggestionResult.summary}
                    </p>
                </div>

                <div className="flex justify-center pt-8">
                    <Button onClick={onReset} variant="outline" size="lg">
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        Start New Analysis
                    </Button>
                </div>
            </div>
        );
    }

    return null;
};
