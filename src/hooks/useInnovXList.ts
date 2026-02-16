import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export interface InnovXDashboardItem {
    id: number;
    company_id: number;
    company_name: string;
    industry: string;
    location: string;
    inserted_at: string;
    // We can fetch logo from the companies table via join
    company: {
        short_name: string;
        logo_url?: string;
        logos?: { logo_url: string }[];
    };
}

export const useInnovXList = () => {
    const [data, setData] = useState<InnovXDashboardItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchList = async () => {
            try {
                setLoading(true);
                // Join with companies table to get the logo and short_name
                // Note: The foreign key relationship needs to be established in Supabase 
                // between innovx_master.company_id and companies.company_id for this to work perfectly.
                // If not, we might need to fetch separately or rely on what's in innovx_master.

                // Assuming simple fetch first from innovx_master
                const { data: innovxData, error: innovxError } = await supabase
                    .from('innovx_master')
                    .select(`
                        id,
                        company_id,
                        company_name,
                        industry,
                        location,
                        inserted_at
                    `);

                if (innovxError) throw innovxError;

                // Now fetch company details (logos) for these IDs
                // This is a manual join if the foreign key isn't set up for auto-detection by PostgREST
                const companyIds = innovxData.map(d => d.company_id).filter(id => id !== null);

                let companiesMap: Record<number, any> = {};

                if (companyIds.length > 0) {
                    const { data: companiesData, error: companiesError } = await supabase
                        .from('companies')
                        .select('company_id, short_name, company_logo(logo_url)')
                        .in('company_id', companyIds);

                    if (companiesData) {
                        companiesData.forEach((c: any) => {
                            companiesMap[c.company_id] = {
                                short_name: c.short_name,
                                logo_url: c.company_logo?.[0]?.logo_url
                            };
                        });
                    }
                }

                // Merge data
                const formattedData: InnovXDashboardItem[] = innovxData.map(item => ({
                    ...item,
                    company: companiesMap[item.company_id] || { short_name: item.company_name, logo_url: undefined }
                }));

                setData(formattedData);
            } catch (err: any) {
                console.error("Error fetching InnovX list:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchList();
    }, []);

    return { data, loading, error };
};
