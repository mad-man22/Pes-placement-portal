import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Company } from '@/data/companyData';

export const useCompany = (shortName: string | undefined) => {
  const [company, setCompany] = useState<Company | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!shortName) {
      setLoading(false);
      return;
    }

    const fetchCompany = async () => {
      try {
        setLoading(true);
        // Fetching deep nested relations for all sections
        const { data, error } = await supabase
          .from('companies')
          .select(`
            *,
            brand_reputation:company_brand_reputation(
              *,
              awards_recognitions:company_awards_recognitions(*),
              event_participation:company_event_participation(*),
              website_traffic_rank:company_website_traffic_rank(*)
            ),
            business:company_business(
              *,
              core_value_proposition:company_core_value_proposition(*),
              pain_points_addressed:company_pain_points_addressed(*),
              unique_differentiators:company_unique_differentiators(*),
              competitive_advantages:company_competitive_advantages(*),
              weaknesses_gaps:company_weaknesses_gaps(*),
              key_challenges_needs:company_key_challenges_needs(*),
              focus_sectors:company_focus_sectors(*),
              offerings_description:company_offerings_description(*),
              go_to_market_strategy:company_go_to_market_strategy(*),
              product_pipeline:company_product_pipeline(*),
              strategic_priorities:company_strategic_priorities(*),
              exit_strategy_history:company_exit_strategy_history(*),
              top_customers:company_top_customers(*),
              key_competitors:company_key_competitors(*),
              benchmark_vs_peers:company_benchmark_vs_peers(*),
              industry_associations:company_industry_associations(*),
              case_studies:company_case_studies(*)
            ),
            compensation:company_compensation(
              *,
              relocation_support:company_relocation_support(*),
              leave_policy:company_leave_policy(*),
              health_support:company_health_support(*),
              family_health_insurance:company_family_health_insurance(*),
              lifestyle_benefits:company_lifestyle_benefits(*),
              esops_incentives:company_esops_incentives(*)
            ),
            culture:company_culture(
              *,
              hiring_velocity:company_hiring_velocity(*),
              diversity_metrics:company_diversity_metrics(*),
              work_culture_summary:company_work_culture_summary(*),
              feedback_culture:company_feedback_culture(*),
              diversity_inclusion_score:company_diversity_inclusion_score(*),
              ethical_standards:company_ethical_standards(*),
              sustainability_csr:company_sustainability_csr(*)
            ),
            financials:company_financials(
              *,
              revenue_mix:company_revenue_mix(*),
              key_investors:company_key_investors(*),
              recent_funding_rounds:company_recent_funding_rounds(*)
            ),
            logistics:company_logistics(
              *,
              public_transport_access:company_public_transport_access(*),
              cab_policy:company_cab_policy(*),
              area_safety:company_area_safety(*),
              safety_policies:company_safety_policies(*),
              infrastructure_safety:company_infrastructure_safety(*),
              emergency_preparedness:company_emergency_preparedness(*)
            ),
            people:company_people(
              *,
              key_leaders:company_key_leaders(*),
              board_members:company_board_members(*),
              warm_intro_pathways:company_warm_intro_pathways(*)
            ),
            talent_growth:company_talent_growth(
              *,
              learning_culture:company_learning_culture(*),
              mentorship_availability:company_mentorship_availability(*),
              promotion_clarity:company_promotion_clarity(*),
              tools_access:company_tools_access(*),
              work_impact:company_work_impact(*),
              cross_functional_exposure:company_cross_functional_exposure(*),
              client_quality:company_client_quality(*),
              exit_opportunities:company_exit_opportunities(*),
              network_strength:company_network_strength(*),
              global_exposure:company_global_exposure(*)
            ),
            technologies:company_technologies(
              *,
              tech_stack:company_tech_stack(*),
              technology_partners:company_technology_partners(*),
              intellectual_property:company_intellectual_property(*),
              tech_adoption_rating:company_tech_adoption_rating(*),
              cybersecurity_posture:company_cybersecurity_posture(*),
              partnership_ecosystem:company_partnership_ecosystem(*)
            ),
            logos:company_logo(*),
            operating_countries:company_operating_countries_map(
                *,
                country:countries(country)
            ),
            office_locations:company_office_locations_map(
                *,
                city:cities(city)
            ),
            core_values:company_core_values(*),
            recent_news:company_recent_news(*),
            history:company_history(*),
            esg_ratings:company_esg_ratings(*),
            ethical_sourcing:company_ethical_sourcing(*),
            supply_chain_dependencies:company_supply_chain_dependencies(*),
            geopolitical_risks:company_geopolitical_risks(*),
            macro_risks:company_macro_risks(*),
            regulatory_status:company_regulatory_status(*),
            customer_testimonials:company_customer_testimonials(*),
            
            flexibility_level:company_flexibility_level(*)
          `)
          .ilike('short_name', shortName)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          const rawData: any = data;

          // Manual Mapping fixes where Schema structure != Interface structure

          // 1. Flexibility Level: Schema puts it on Company, Interface puts it on Logistics
          if (rawData.logistics && Array.isArray(rawData.logistics) && rawData.logistics.length > 0) {
            if (rawData.flexibility_level) {
              rawData.logistics[0].flexibility_level = rawData.flexibility_level;
              delete rawData.flexibility_level;
            }
          }

          // 2. Map Operating Countries: Flatten nested country object
          if (rawData.operating_countries && Array.isArray(rawData.operating_countries)) {
            rawData.operating_countries = rawData.operating_countries.map((item: any) => ({
              ...item,
              country_name: item.country?.country
            }));
          }

          // 3. Map Office Locations: Flatten nested city object
          if (rawData.office_locations && Array.isArray(rawData.office_locations)) {
            rawData.office_locations = rawData.office_locations.map((item: any) => ({
              ...item,
              city_name: item.city?.city
            }));
          }

          setCompany(rawData as unknown as Company);
        } else {
          setCompany(undefined);
        }
      } catch (err: any) {
        console.error('Error fetching company:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [shortName]);

  return { company, loading, error };
};
