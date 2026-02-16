import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { HiringData } from "@/types/hiring";

export const useHiringData = (companyId?: number) => {
    const [data, setData] = useState<HiringData | null>(null);
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

                // Fetch from hiring_rounds_raw table
                const { data: record, error: dbError } = await supabase
                    .from('hiring_rounds_raw')
                    .select('hiring_data, company_name')
                    .eq('company_id', companyId)
                    .single();

                if (dbError) throw dbError;

                if (record && record.hiring_data) {
                    // Merge DB company_name if missing in JSON, or just ensures it exists
                    const hiringData = record.hiring_data as unknown as HiringData;
                    setData({
                        ...hiringData,
                        company_name: record.company_name || hiringData.company_name
                    });
                } else {
                    setData(null);
                }
            } catch (err: any) {
                console.error("Error fetching Hiring data:", err);
                setError(err.message || "Failed to fetch hiring data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [companyId]);

    return { data, loading, error };
};
