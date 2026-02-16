import { useState } from "react";
import { CompanySelector } from "@/components/compare/CompanySelector";
import { ComparisonTable } from "@/components/compare/ComparisonTable";
import { useCompareCompanies } from "@/hooks/useCompareCompanies";
import { IntelliplaceAssistant } from "@/components/chat/IntelliplaceAssistant";
import Layout from "@/components/Layout";

const Compare = () => {
    const [selectedShortNames, setSelectedShortNames] = useState<string[]>([]);
    const { companies, loading, error } = useCompareCompanies(selectedShortNames);

    const handleSelect = (shortName: string) => {
        if (selectedShortNames.length < 3 && !selectedShortNames.includes(shortName)) {
            setSelectedShortNames([...selectedShortNames, shortName]);
        }
    };

    const handleRemove = (shortName: string) => {
        setSelectedShortNames(selectedShortNames.filter(n => n !== shortName));
    };

    return (
        <Layout showBackButton={true}>
            <div className="relative">
                {/* Global Background Mesh */}
                <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent opacity-50"></div>
                <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-pink-500/10 via-transparent to-transparent opacity-50"></div>

                <div className="max-w-6xl mx-auto space-y-8 relative z-10">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                            Compare Companies
                        </h1>
                        <p className="text-muted-foreground mb-8">
                            Select up to 3 companies to view their key metrics, culture, and benefits side-by-side.
                            This helps you decide which company aligns best with your career goals.
                        </p>

                        <div className="bg-white/40 dark:bg-black/20 backdrop-blur-md p-8 rounded-2xl border-0 ring-1 ring-black/5 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5">
                            <CompanySelector
                                selectedShortNames={selectedShortNames}
                                onSelect={handleSelect}
                                onRemove={handleRemove}
                            />
                        </div>
                    </div>

                    {loading && (
                        <div className="text-center py-12">
                            <p>Loading comparison data...</p>
                        </div>
                    )}

                    {error && (
                        <div className="text-center py-12 text-destructive">
                            <p>Error loading data: {error}</p>
                        </div>
                    )}

                    {!loading && !error && companies.length > 0 && (
                        <ComparisonTable companies={companies} />
                    )}

                    {!loading && !error && companies.length === 0 && selectedShortNames.length === 0 && (
                        <div className="text-center py-16 border-2 border-dashed rounded-lg">
                            <p className="text-muted-foreground">
                                Start by selecting a company from the dropdown above.
                            </p>
                        </div>
                    )}
                </div>

            </div>
        </Layout>
    );
};

export default Compare;
