import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { InnovXData } from "@/types/innovx";

interface UseInnovXResult {
    data: InnovXData | null;
    loading: boolean;
    error: string | null;
}

export const useInnovX = (companyId?: number) => {
    const [data, setData] = useState<InnovXData | null>(null);
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

                // Fetch from innovx_master table
                const { data: innovxRecords, error: innovxError } = await supabase
                    .from('innovx_master')
                    .select('json_data')
                    .eq('company_id', companyId)
                    .limit(1);

                if (innovxError) throw innovxError;

                if (innovxRecords && innovxRecords.length > 0 && innovxRecords[0].json_data) {
                    // Type assertion assuming the JSON structure matches our interface
                    // In a real production app, we should use Zod or similar to validate
                    setData(innovxRecords[0].json_data as unknown as InnovXData);
                } else {
                    setData(null);
                }
            } catch (err: any) {
                console.error("Error fetching InnovX data:", err);
                setError(err.message || "Failed to fetch company research data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [companyId]);

    return { data, loading, error };
};
