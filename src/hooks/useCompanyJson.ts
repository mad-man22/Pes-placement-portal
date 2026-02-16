import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
// We reuse the Company interface or define a new one if structure differs significantly.
// Assuming 'full_json' matches the detailed schema we saw earlier.
import { Company } from '@/data/companyData';

export const useCompanyJson = (companyId?: number) => {
    const [fullData, setFullData] = useState<any | null>(null); // Using any or specific type if available
    const [shortData, setShortData] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!companyId) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                // Fetch from company_json table
                const { data: record, error: dbError } = await supabase
                    .from('company_json')
                    .select('full_json, short_json')
                    .eq('company_id', companyId)
                    .single();

                if (dbError) throw dbError;

                if (record) {
                    setFullData(record.full_json);
                    setShortData(record.short_json);
                } else {
                    setFullData(null);
                    setShortData(null);
                }
            } catch (err: any) {
                console.error("Error fetching Company JSON:", err);
                setError(err.message || "Failed to fetch company details");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [companyId]);

    return { fullData, shortData, loading, error };
};
