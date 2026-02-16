import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Company } from '@/data/companyData';

export const useCompanies = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('companies')
                    .select(`
            *,
            financials:company_financials(*),
            logos:company_logo(*),
            operating_countries:company_operating_countries_map(*)
          `);

                if (error) {
                    throw error;
                }

                if (data) {
                    setCompanies(data as unknown as Company[]);
                }
            } catch (err: any) {
                console.error('Error fetching companies:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    return { companies, loading, error };
};
