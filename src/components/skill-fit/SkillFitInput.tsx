import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, Building2, FileText, Upload, Trash2 } from "lucide-react";
import { CompanySelector } from "@/components/compare/CompanySelector";
import { Company } from "@/data/companyData";
import { useCompanies } from "@/hooks/useCompanies";
import { Switch } from "@/components/ui/switch";
import { extractTextFromPdf } from "@/lib/pdfUtils";

interface SkillFitInputProps {
    onAnalyze: (company: Company | null, userSkills: string, mode: 'single' | 'suggest') => void;
    loading: boolean;
}

export const SkillFitInput = ({ onAnalyze, loading }: SkillFitInputProps) => {
    const [selectedShortNames, setSelectedShortNames] = useState<string[]>([]);
    const [userSkills, setUserSkills] = useState("");
    const [suggestMode, setSuggestMode] = useState(false);
    const { companies } = useCompanies();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSelect = (shortName: string) => {
        if (suggestMode) return; // Disable selection in suggest mode
        if (selectedShortNames.includes(shortName)) return;

        // For single analysis mode, we currently support one at a time for deep dive, 
        // or we can allow switching between them. Let's keep it simple: 1 company for "Check Fit", 
        // or 0 companies for "Suggest Best Fit".
        // Wait, user asked for "unable to select multiple companies".
        // If they want to select multiple, maybe they want to analyze multiple?
        // Let's allow selecting multiple, but for the 'single' deep dive, we might iterate?
        // Or maybe the user implies the "Best Match" mode IS the multi-select mode?
        // Let's assume:
        // Mode 1: Detailed check against specific companies (allow multiple selection now).
        // Mode 2: Suggest Best Fit (scans ALL companies).

        // The previous implementation forced 1. Let's allow up to 3 for manual check?
        // But verify API limits. For now, let's allow multi-select and maybe run getting best fit among SELECTED?
        // Actually, "suggest best companies" usually implies checking against the database.
        // "select multiple companies" implies selecting a subset.

        if (selectedShortNames.length < 5) {
            setSelectedShortNames([...selectedShortNames, shortName]);
        }
    };

    const handleRemove = (shortName: string) => {
        setSelectedShortNames(selectedShortNames.filter(n => n !== shortName));
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            if (file.type === 'application/pdf') {
                const text = await extractTextFromPdf(file);
                setUserSkills(prev => prev + "\n" + text);
            } else if (file.type === 'text/plain' || file.name.endsWith('.md')) {
                const text = await file.text();
                setUserSkills(prev => prev + "\n" + text);
            } else {
                alert("Please upload a PDF, TXT, or MD file.");
            }
        } catch (error: any) {
            console.error(error);
            alert(error.message || "Failed to read file.");
        }
    };

    const calculate = () => {
        if (!userSkills.trim()) return;

        if (suggestMode) {
            // Suggest best fit from ALL companies or SELECTED companies?
            // Usually "Suggest best fit" implies searching logically.
            // User said: "suggest best companies for the skills present"
            // Let's pass null as company to indicate "All/Suggest Mode".
            onAnalyze(null, userSkills, 'suggest');
        } else {
            // Analyze specific selected companies
            // If multiple are selected, we might need a batch mode or just pick the first one?
            // "analyzing skill fit" implies deep dive.
            // If user wants multiple, maybe they want the suggestion mode but limited to these?
            // Let's try: If multiple selected, run 'suggest' scoped to these companies.
            // If 1 selected, run 'deep analyze'.

            if (selectedShortNames.length === 1) {
                const company = companies.find(c => c.short_name === selectedShortNames[0]);
                if (company) onAnalyze(company, userSkills, 'single');
            } else if (selectedShortNames.length > 1) {
                // Treat as a "ranking" among selected
                // We can use the 'suggest' endpoint but pass only these companies to the Logic layer.
                // We'll handle this filtering in the parent.
                onAnalyze(null, userSkills, 'suggest');
            }
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-900 dark:to-indigo-900 shadow-2xl p-8 md:p-12 text-white">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
                <div className="absolute top-0 right-0 p-12 opacity-10 transform translate-x-12 -translate-y-12">
                    <Sparkles className="w-64 h-64 text-white" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-2 max-w-xl">
                        <div className="flex items-center gap-2 text-indigo-100 font-medium mb-2">
                            <Sparkles className="w-5 h-5" />
                            <span>AI-Powered Analysis</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                            Find Your Perfect <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">Career Match</span>
                        </h1>
                        <p className="text-indigo-100 text-lg md:text-xl font-medium opacity-90">
                            {suggestMode
                                ? "Let our AI scan the entire market to find companies that match your unique DNA."
                                : "Deep dive into specific companies to uncover hidden strengths and gaps."}
                        </p>
                    </div>

                    <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20">
                        <span className={`px-4 py-2 rounded-full text-sm font-bold transition-all cursor-pointer ${!suggestMode ? "bg-white text-indigo-600 shadow-lg" : "text-white/70 hover:text-white"}`} onClick={() => setSuggestMode(false)}>
                            Direct Check
                        </span>
                        <span className={`px-4 py-2 rounded-full text-sm font-bold transition-all cursor-pointer ${suggestMode ? "bg-white text-indigo-600 shadow-lg" : "text-white/70 hover:text-white"}`} onClick={() => setSuggestMode(true)}>
                            Discovery Mode
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* 1. Select Company */}
                <Card className={`border-0 shadow-2xl bg-white/30 dark:bg-black/30 backdrop-blur-2xl ${suggestMode ? "opacity-50 pointer-events-none grayscale" : "ring-1 ring-black/5"} transition-all duration-500 relative overflow-hidden group hover:shadow-xl hover:-translate-y-1`}>
                    {/* Gradient Border Line */}
                    <div className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-br from-indigo-300/10 via-purple-300/10 to-pink-300/10 -z-10 opacity-70 group-hover:opacity-100 group-hover:from-indigo-200 group-hover:via-purple-200 group-hover:to-pink-200 transition-all duration-500" />

                    {/* Internal Gradient Overlay (Softened) */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                    <CardHeader className="relative z-10">
                        <CardTitle className="flex items-center gap-3 text-xl">
                            <div className="p-2.5 bg-primary/10 rounded-xl text-primary shadow-inner">
                                <Building2 className="h-6 w-6" />
                            </div>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">1. Select Companies</span>
                        </CardTitle>
                        <CardDescription className="text-base">
                            Choose up to 5 companies for a deep-dive analysis.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <CompanySelector
                            selectedShortNames={selectedShortNames}
                            onSelect={handleSelect}
                            onRemove={handleRemove}
                        />
                    </CardContent>
                </Card>

                {/* 2. Input Skills */}
                <Card className="border-0 shadow-2xl bg-white/30 dark:bg-black/30 backdrop-blur-2xl ring-1 ring-black/5 relative overflow-hidden group hover:shadow-xl hover:-translate-y-1">
                    {/* Gradient Border Line */}
                    <div className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-br from-indigo-300/10 via-purple-300/10 to-pink-300/10 -z-10 opacity-70 group-hover:opacity-100 group-hover:from-indigo-200 group-hover:via-purple-200 group-hover:to-pink-200 transition-all duration-500" />

                    {/* Internal Gradient Overlay (Softened) */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-100/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                    <CardHeader className="relative z-10">
                        <CardTitle className="flex items-center gap-3 text-xl">
                            <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-600 shadow-inner">
                                <FileText className="h-6 w-6" />
                            </div>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">2. Your Profile</span>
                        </CardTitle>
                        <CardDescription className="text-base">
                            Upload your resume or paste your skills.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 relative z-10">
                        <div>
                            <Label>Upload Resume (Text)</Label>
                            <div className="flex gap-2 mt-2">
                                <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                                    <Upload className="h-4 w-4 mr-2" />
                                    Upload File
                                </Button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept=".txt,.md,.pdf"
                                    onChange={handleFileUpload}
                                />
                                {userSkills.length > 50 && (
                                    <Button variant="ghost" size="sm" onClick={() => setUserSkills("")} className="text-destructive hover:text-destructive">
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Clear
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="skills">Skills / Resume Content</Label>
                            <Textarea
                                id="skills"
                                placeholder="Paste your resume summary or list skills here..."
                                className="min-h-[200px] font-mono text-sm"
                                value={userSkills}
                                onChange={(e) => setUserSkills(e.target.value)}
                            />
                        </div>

                        <Button
                            onClick={calculate}
                            disabled={loading || (!suggestMode && selectedShortNames.length === 0) || !userSkills.trim()}
                            className="w-full"
                            size="lg"
                        >
                            {loading ? (
                                <>AI is thinking...</>
                            ) : (
                                <>
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    {suggestMode ? "Find Best Matches" : "Analyze Fit"}
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
