import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

import { HiringData } from "@/types/hiring";

export interface HiringDashboardItem {
    id: number;
    company_id: number;
    company_name: string;
    inserted_at: string;
    hiring_data: HiringData;
    // Joined data
    company: {
        short_name: string;
        logo_url?: string;
        headquarters_address?: string;
    };
}

export const useHiringList = () => {
    const [data, setData] = useState<HiringDashboardItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchList = async () => {
            try {
                setLoading(true);

                // Fetch from hiring_rounds_raw table
                const { data: hiringData, error: hiringError } = await supabase
                    .from('hiring_rounds_raw')
                    .select(`
                        id,
                        company_id,
                        company_name,
                        inserted_at,
                        hiring_data
                    `);

                if (hiringError) throw hiringError;

                // Fetch company details
                // Manually joining for safety as FK might not be enforced
                const companyIds = hiringData.map(d => d.company_id).filter(id => id !== null);

                let companiesMap: Record<number, any> = {};

                if (companyIds.length > 0) {
                    const { data: companiesData, error: companiesError } = await supabase
                        .from('companies')
                        .select('company_id, short_name, headquarters_address, company_logo(logo_url)')
                        .in('company_id', companyIds);

                    if (companiesData) {
                        companiesData.forEach((c: any) => {
                            // Sometime company_logo comes as an array of objects
                            const logoData = c.company_logo;
                            let logoUrl = undefined;
                            if (Array.isArray(logoData) && logoData.length > 0) {
                                logoUrl = logoData[0]?.logo_url;
                            } else if (logoData && typeof logoData === 'object') {
                                // @ts-ignore
                                logoUrl = logoData.logo_url;
                            }

                            companiesMap[c.company_id] = {
                                short_name: c.short_name,
                                headquarters_address: c.headquarters_address,
                                logo_url: logoUrl
                            };
                        });
                    }
                }

                // Merge data
                const formattedData: HiringDashboardItem[] = hiringData.map(item => ({
                    ...item,
                    company: companiesMap[item.company_id] || {
                        short_name: item.company_name,
                        logo_url: undefined,
                        headquarters_address: 'Unknown'
                    }
                }));

                setData(formattedData);
            } catch (err: any) {
                console.error("Error fetching Hiring list:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchList();
    }, []);

    return { data, loading, error };
};
