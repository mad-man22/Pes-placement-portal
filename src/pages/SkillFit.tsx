import { useState } from "react";
import { SkillFitInput } from "@/components/skill-fit/SkillFitInput";
import { SkillFitResult } from "@/components/skill-fit/SkillFitResult";
import { AnalysisResult, SuggestionResult, analyzeSkillFit, suggestBestFits } from "@/lib/gemini";
import { Company } from "@/data/companyData";
import { useCompanies } from "@/hooks/useCompanies";
import Layout from "@/components/Layout";
import { IntelliplaceAssistant } from "@/components/chat/IntelliplaceAssistant";

const SkillFit = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [suggestionResult, setSuggestionResult] = useState<SuggestionResult | null>(null);
    const [targetCompany, setTargetCompany] = useState<Company | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { companies } = useCompanies();

    const handleAnalyze = async (company: Company | null, userSkills: string, mode: 'single' | 'suggest') => {
        try {
            setLoading(true);
            setError(null);

            if (mode === 'single' && company) {
                setTargetCompany(company);
                const analysis = await analyzeSkillFit(userSkills, company);
                setResult(analysis);
                setSuggestionResult(null);
            } else if (mode === 'suggest') {
                const suggestions = await suggestBestFits(userSkills, companies);
                setSuggestionResult(suggestions);
                setResult(null);
                setTargetCompany(null);
            }
        } catch (err: any) {
            setError(err.message || "Something went wrong. Please ensure your API Key is valid and try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setResult(null);
        setSuggestionResult(null);
        setTargetCompany(null);
        setError(null);
    };

    return (
        <Layout showBackButton={true}>
            <div className="max-w-5xl mx-auto space-y-6">
                <div className="text-center md:text-left">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">AI Skill Fit Analysis</h1>
                    <p className="text-muted-foreground">
                        Leverage AI to compare your technical skills against real company requirements.
                    </p>
                </div>

                {error && (
                    <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-md border border-destructive/20">
                        {error}
                    </div>
                )}

                {!result && !suggestionResult ? (
                    <SkillFitInput onAnalyze={handleAnalyze} loading={loading} />
                ) : (
                    <SkillFitResult
                        result={result || undefined}
                        suggestionResult={suggestionResult || undefined}
                        company={targetCompany || undefined}
                        onReset={handleReset}
                    />
                )}
            </div>
        </Layout>
    );
};

export default SkillFit;
