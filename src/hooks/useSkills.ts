import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { CompanySkillLevel } from '@/types/skills';

export const useCompanySkills = (companyIds: number[]) => {
    const [skillsData, setSkillsData] = useState<CompanySkillLevel[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSkills = async () => {
            if (companyIds.length === 0) {
                setSkillsData([]);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                // Fetch company skill levels with related skill set and proficiency level
                const { data, error: err } = await supabase
                    .from('company_skill_levels')
                    .select(`
                        *,
                        skill_set:skill_set_master(*),
                        proficiency_level:proficiency_levels(*)
                    `)
                    .in('company_id', companyIds);

                if (err) {
                    throw err;
                }

                if (data) {
                    // Start fetching topics for each skill level
                    // We need to fetch topics where skill_set_id matches AND level_number <= required_level (or exactly match? usually cumulative or exact)
                    // Let's assume for now we want to show topics for the specific required level.

                    const enrichedData = await Promise.all(data.map(async (item: any) => {
                        const { data: topicsData } = await supabase
                            .from('skill_set_topics')
                            .select('*')
                            .eq('skill_set_id', item.skill_set_id)
                            .eq('level_number', item.required_level); // Assuming level_number implies the level of topic

                        return {
                            ...item,
                            topics: topicsData || []
                        };
                    }));

                    setSkillsData(enrichedData as CompanySkillLevel[]);
                }
            } catch (err: any) {
                console.error('Error fetching company skills:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSkills();
    }, [JSON.stringify(companyIds)]); // React to changes in the array content

    return { skillsData, loading, error };
};
