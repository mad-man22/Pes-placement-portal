import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Company } from "@/data/companyData";
import { DataSection, DataItem } from "./DataSection";
import {
  Building2,
  Briefcase,
  Users,
  DollarSign,
  Shield,
  Lightbulb,
  GraduationCap,
  Heart,
  Globe,
  TrendingUp,
  Award,
  Target
} from "lucide-react";

interface CompanyTabsProps {
  company: Company;
}

export const CompanyTabs = ({ company }: CompanyTabsProps) => {
  // Helper to join array of objects into string
  const join = <T,>(arr: T[] | undefined, key: keyof T): string => {
    if (!arr) return "";
    return arr.map(item => String(item[key])).filter(Boolean).join("; ");
  };

  const formatEmployeeSize = (size: string) => {
    if (!size) return "N/A";
    if (/^[\d,]+$/.test(size)) {
      return parseInt(size.replace(/,/g, "")).toLocaleString() + " employees";
    }
    if (size.toLowerCase().includes("employee")) return size;
    return size + " employees";
  };

  const business = company.business?.[0];
  const brand = company.brand_reputation?.[0];
  const culture = company.culture?.[0];
  const financials = company.financials?.[0];
  const logistics = company.logistics?.[0];
  const people = company.people?.[0];
  const talent = company.talent_growth?.[0];
  const tech = company.technologies?.[0];
  const comp = company.compensation?.[0];

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="w-full flex-wrap h-auto gap-2 bg-transparent p-0 mb-8">
        {[
          { id: "overview", label: "Overview" },
          { id: "business", label: "Business" },
          { id: "people", label: "People & Culture" },
          { id: "financials", label: "Financials" },
          { id: "growth", label: "Growth & Career" },
          { id: "operations", label: "Operations" },
          { id: "leadership", label: "Leadership" }
        ].map(tab => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="rounded-full px-5 py-2.5 text-sm font-medium border border-transparent data-[state=active]:border-primary/20 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none hover:bg-white/10 dark:hover:bg-white/10 transition-all"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Overview Tab */}
      <TabsContent value="overview" className="space-y-6">
        <DataSection title="Company Narrative" icon={<Building2 className="h-5 w-5" />} columns={1}>
          <DataItem label="Overview" value={company.overview_text} multiline />
          <DataItem label="Vision" value={company.vision_statement} />
          <DataItem label="Mission" value={company.mission_statement} />
          <DataItem label="Values" value={join(company.core_values, 'core_values')} />
          <DataItem label="History" value={join(company.history, 'history_timeline')} />
          <DataItem label="Recent News" value={join(company.recent_news, 'recent_news')} />
        </DataSection>

        <DataSection title="Geographic Presence" icon={<Globe className="h-5 w-5" />}>
          <DataItem label="Countries Operating In" value={join(company.operating_countries, 'country_name')} />
          <DataItem label="Number of Offices" value={company.office_count} />
          <DataItem label="Office Locations" value={join(company.office_locations, 'city_name')} />
        </DataSection>

        <DataSection title="Digital Presence" icon={<Globe className="h-5 w-5" />}>
          <DataItem label="Website" value={company.website_url} />
          <DataItem label="Website Quality" value={brand?.website_quality} />
          <DataItem label="Website Rating" value={brand?.website_rating} />
          <DataItem label="Traffic Rank" value={join(brand?.website_traffic_rank, 'website_traffic_rank')} />
          <DataItem label="Social Media Followers" value={brand?.social_media_followers} />
          <DataItem label="Glassdoor Rating" value={brand?.glassdoor_rating} />
          <DataItem label="Indeed Rating" value={brand?.indeed_rating} />
          <DataItem label="Google Reviews" value={brand?.google_rating} />
        </DataSection>

        <DataSection title="Reputation & Awards" icon={<Award className="h-5 w-5" />}>
          <DataItem label="Awards & Recognitions" value={join(brand?.awards_recognitions, 'awards_recognitions')} />
          <DataItem label="Brand Sentiment" value={brand?.brand_sentiment_score} />
          <DataItem label="Event Participation" value={join(brand?.event_participation, 'event_participation')} />
        </DataSection>
      </TabsContent>

      {/* Business Tab */}
      <TabsContent value="business" className="space-y-6">
        <DataSection title="Business Model" icon={<Briefcase className="h-5 w-5" />}>
          <DataItem label="Pain Points Addressed" value={join(business?.pain_points_addressed, 'pain_points_addressed')} />
          <DataItem label="Focus Sectors" value={join(business?.focus_sectors, 'focus_sectors')} />
          <DataItem label="Services & Offerings" value={join(business?.offerings_description, 'offerings_description')} />
          <DataItem label="Top Customers" value={join(business?.top_customers, 'top_customers')} />
          <DataItem label="Core Value Proposition" value={join(business?.core_value_proposition, 'core_value_proposition')} />
        </DataSection>

        <DataSection title="Strategy & Differentiation" icon={<Target className="h-5 w-5" />}>
          <DataItem label="Unique Differentiators" value={join(business?.unique_differentiators, 'unique_differentiators')} />
          <DataItem label="Competitive Advantages" value={join(business?.competitive_advantages, 'competitive_advantages')} />
          <DataItem label="Weaknesses & Gaps" value={join(business?.weaknesses_gaps, 'weaknesses_gaps')} />
          <DataItem label="Key Challenges" value={join(business?.key_challenges_needs, 'key_challenges_needs')} />
        </DataSection>

        <DataSection title="Competitive Landscape" icon={<TrendingUp className="h-5 w-5" />}>
          <DataItem label="Key Competitors" value={join(business?.key_competitors, 'key_competitors')} />
          <DataItem label="Benchmark vs Peers" value={join(business?.benchmark_vs_peers, 'benchmark_vs_peers')} />
        </DataSection>

        <DataSection title="Market Position" icon={<Globe className="h-5 w-5" />}>
          <DataItem label="Total Addressable Market (TAM)" value={business?.tam} />
          <DataItem label="Serviceable Addressable Market (SAM)" value={business?.sam} />
          <DataItem label="Serviceable Obtainable Market (SOM)" value={business?.som} />
          <DataItem label="Go-to-Market Strategy" value={join(business?.go_to_market_strategy, 'go_to_market_strategy')} />
        </DataSection>
      </TabsContent>

      {/* People & Culture Tab */}
      <TabsContent value="people" className="space-y-6">
        <DataSection title="People & Talent" icon={<Users className="h-5 w-5" />}>
          <DataItem label="Employee Size" value={formatEmployeeSize(company.employee_size)} />
          <DataItem label="Hiring Velocity" value={join(culture?.hiring_velocity, 'hiring_velocity')} />
          <DataItem label="Employee Turnover" value={culture?.employee_turnover} />
          <DataItem label="Average Retention Tenure" value={culture?.avg_retention_tenure} />
          <DataItem label="Diversity Metrics" value={join(culture?.diversity_metrics, 'diversity_metrics')} />
        </DataSection>

        <DataSection title="Culture & Environment" icon={<Heart className="h-5 w-5" />}>
          <DataItem label="Work Culture" value={join(culture?.work_culture_summary, 'work_culture_summary')} />
          <DataItem label="Manager Quality" value={culture?.manager_quality} />
          <DataItem label="Psychological Safety" value={culture?.psychological_safety} />
          <DataItem label="Feedback Culture" value={join(culture?.feedback_culture, 'feedback_culture')} />
          <DataItem label="Diversity & Inclusion" value={join(culture?.diversity_inclusion_score, 'diversity_inclusion_score')} />
          <DataItem label="Ethical Standards" value={join(culture?.ethical_standards, 'ethical_standards')} />
        </DataSection>

        <DataSection title="Work-Life Balance" icon={<Heart className="h-5 w-5" />}>
          <DataItem label="Typical Working Hours" value={logistics?.typical_hours} />
          <DataItem label="Overtime Expectations" value={logistics?.overtime_expectations} />
          <DataItem label="Weekend Work" value={logistics?.weekend_work} />
          <DataItem label="Remote/Hybrid/On-site" value={logistics?.remote_policy_details} />
          <DataItem label="Leave Policy" value={join(comp?.leave_policy, 'leave_policy')} />
          <DataItem label="Burnout Risk" value={culture?.burnout_risk} />
        </DataSection>

        <DataSection title="Safety & Wellbeing" icon={<Shield className="h-5 w-5" />}>
          <DataItem label="Area Safety" value={join(logistics?.area_safety, 'area_safety')} />
          <DataItem label="Company Safety Policies" value={join(logistics?.safety_policies, 'safety_policies')} />
          <DataItem label="Office Infrastructure Safety" value={join(logistics?.infrastructure_safety, 'infrastructure_safety')} />
          <DataItem label="Emergency Preparedness" value={join(logistics?.emergency_preparedness, 'emergency_preparedness')} />
          <DataItem label="Health Support" value={join(comp?.health_support, 'health_support')} />
        </DataSection>
      </TabsContent>

      {/* Financials Tab */}
      <TabsContent value="financials" className="space-y-6">
        <DataSection title="Financial Performance" icon={<DollarSign className="h-5 w-5" />}>
          <DataItem label="Annual Revenues" value={financials?.annual_revenue} />
          <DataItem label="Annual Profits" value={financials?.annual_profit} />
          <DataItem label="Revenue Mix" value={join(financials?.revenue_mix, 'revenue_mix')} />
          <DataItem label="Company Valuation" value={financials?.valuation} />
          <DataItem label="Year-over-Year Growth" value={financials?.yoy_growth_rate} />
          <DataItem label="Profitability Status" value={financials?.profitability_status} />
          <DataItem label="Market Share" value={business?.market_share_percentage} />
        </DataSection>

        <DataSection title="Funding & Investment" icon={<TrendingUp className="h-5 w-5" />}>
          <DataItem label="Key Investors" value={join(financials?.key_investors, 'key_investors')} />
          <DataItem label="Recent Funding Rounds" value={join(financials?.recent_funding_rounds, 'recent_funding_rounds')} />
          <DataItem label="Total Capital Raised" value={financials?.total_capital_raised} />
        </DataSection>

        <DataSection title="Sales & Growth Metrics" icon={<TrendingUp className="h-5 w-5" />}>
          <DataItem label="Sales Motion" value={business?.sales_motion} />
          <DataItem label="Customer Acquisition Cost" value={financials?.customer_acquisition_cost} />
          <DataItem label="Customer Lifetime Value" value={financials?.customer_lifetime_value} />
          <DataItem label="CAC:LTV Ratio" value={financials?.cac_ltv_ratio} />
          <DataItem label="Churn Rate" value={financials?.churn_rate} />
          <DataItem label="Net Promoter Score" value={financials?.net_promoter_score} />
        </DataSection>

        <DataSection title="Sustainability & ESG" icon={<Shield className="h-5 w-5" />}>
          <DataItem label="ESG Practices & Ratings" value={join(company.esg_ratings, 'esg_ratings')} />
          <DataItem label="Carbon Footprint" value={company.carbon_footprint} />
          <DataItem label="Ethical Sourcing" value={join(company.ethical_sourcing, 'ethical_sourcing')} />
        </DataSection>
      </TabsContent>

      {/* Growth & Career Tab */}
      <TabsContent value="growth" className="space-y-6">
        <DataSection title="Learning & Growth" icon={<GraduationCap className="h-5 w-5" />}>
          <DataItem label="Onboarding & Training Quality" value={talent?.onboarding_quality} />
          <DataItem label="Learning Culture" value={join(talent?.learning_culture, 'learning_culture')} />
          <DataItem label="Exposure Quality" value={talent?.exposure_quality} />
          <DataItem label="Mentorship Availability" value={join(talent?.mentorship_availability, 'mentorship_availability')} />
          <DataItem label="Internal Mobility" value={talent?.internal_mobility} />
          <DataItem label="Promotion Clarity" value={join(talent?.promotion_clarity, 'promotion_clarity')} />
          <DataItem label="Tools & Technology Access" value={join(talent?.tools_access, 'tools_access')} />
        </DataSection>

        <DataSection title="Role & Work Quality" icon={<Briefcase className="h-5 w-5" />}>
          <DataItem label="Role Clarity" value={talent?.role_clarity} />
          <DataItem label="Early Ownership" value={talent?.early_ownership} />
          <DataItem label="Work Impact" value={join(talent?.work_impact, 'work_impact')} />
          <DataItem label="Execution vs Thinking Balance" value={talent?.execution_thinking_balance} />
          <DataItem label="Automation Level" value={talent?.automation_level} />
          <DataItem label="Cross-functional Exposure" value={join(talent?.cross_functional_exposure, 'cross_functional_exposure')} />
        </DataSection>

        <DataSection title="Compensation & Benefits" icon={<DollarSign className="h-5 w-5" />}>
          <DataItem label="Fixed vs Variable Pay" value={comp?.fixed_vs_variable_pay} />
          <DataItem label="Bonus Predictability" value={comp?.bonus_predictability} />
          <DataItem label="ESOPs & Long-term Incentives" value={join(comp?.esops_incentives, 'esops_incentives')} />
          <DataItem label="Family Health Insurance" value={join(comp?.family_health_insurance, 'family_health_insurance')} />
          <DataItem label="Relocation Support" value={join(comp?.relocation_support, 'relocation_support')} />
          <DataItem label="Lifestyle & Wellness Benefits" value={join(comp?.lifestyle_benefits, 'lifestyle_benefits')} />
        </DataSection>

        <DataSection title="Long-Term Career Signaling" icon={<TrendingUp className="h-5 w-5" />}>
          <DataItem label="Exit Opportunities" value={join(talent?.exit_opportunities, 'exit_opportunities')} />
          <DataItem label="Skill Relevance" value={talent?.skill_relevance} />
          <DataItem label="External Recognition" value={talent?.external_recognition} />
          <DataItem label="Network Strength" value={join(talent?.network_strength, 'network_strength')} />
          <DataItem label="Global Exposure" value={join(talent?.global_exposure, 'global_exposure')} />
        </DataSection>
      </TabsContent>

      {/* Operations Tab */}
      <TabsContent value="operations" className="space-y-6">
        <DataSection title="Technology & Innovation" icon={<Lightbulb className="h-5 w-5" />}>
          <DataItem label="Tech Stack" value={join(tech?.tech_stack, 'tech_stack')} />
          <DataItem label="Cybersecurity Posture" value={join(tech?.cybersecurity_posture, 'cybersecurity_posture')} />
          <DataItem label="AI/ML Adoption Level" value={tech?.ai_ml_adoption_level} />
          <DataItem label="Intellectual Property" value={join(tech?.intellectual_property, 'intellectual_property')} />
          <DataItem label="R&D Investment" value={tech?.r_and_d_investment} />
          <DataItem label="Innovation Roadmap" value={business?.innovation_roadmap} />
          <DataItem label="Product Pipeline" value={join(business?.product_pipeline, 'product_pipeline')} />
        </DataSection>

        <DataSection title="Risk & Compliance" icon={<Shield className="h-5 w-5" />}>
          <DataItem label="Regulatory Status" value={join(company.regulatory_status, 'regulatory_status')} />
          <DataItem label="Legal Issues / Controversies" value={company.legal_issues} />
          <DataItem label="Geopolitical Risks" value={join(company.geopolitical_risks, 'geopolitical_risks')} />
          <DataItem label="Macro Risks" value={join(company.macro_risks, 'macro_risks')} />
          <DataItem label="Supply Chain Dependencies" value={join(company.supply_chain_dependencies, 'supply_chain_dependencies')} />
        </DataSection>

        <DataSection title="Location & Commute" icon={<Building2 className="h-5 w-5" />}>
          <DataItem label="Location Type" value={logistics?.location_centrality} />
          <DataItem label="Public Transport Access" value={join(logistics?.public_transport_access, 'public_transport_access')} />
          <DataItem label="Cab Availability" value={join(logistics?.cab_policy, 'cab_policy')} />
          <DataItem label="Commute Time from Airport" value={logistics?.airport_commute_time} />
          <DataItem label="Office Zone Type" value={logistics?.office_zone_type} />
        </DataSection>

        <DataSection title="Company Stability" icon={<Shield className="h-5 w-5" />}>
          <DataItem label="Company Maturity" value={talent?.company_maturity} />
          <DataItem label="Brand Value" value={talent?.brand_value} />
          <DataItem label="Client Quality" value={join(talent?.client_quality, 'client_quality')} />
          <DataItem label="Layoff History" value={culture?.layoff_history} />
        </DataSection>
      </TabsContent>

      {/* Leadership Tab */}
      <TabsContent value="leadership" className="space-y-6">
        <DataSection title="Leadership Team" icon={<Users className="h-5 w-5" />}>
          <DataItem label="CEO" value={people?.ceo_name} />
          <DataItem label="CEO LinkedIn" value={people?.ceo_linkedin_url} />
          <DataItem label="Key Business Leaders" value={join(people?.key_leaders, 'key_leaders')} />
          <DataItem label="Board of Directors" value={join(people?.board_members, 'board_members')} />
        </DataSection>

        <DataSection title="Contact Information" icon={<Building2 className="h-5 w-5" />}>
          <DataItem label="Company Contact Email" value={company.primary_contact_email} />
          <DataItem label="Company Phone" value={company.primary_phone_number} />
          <DataItem label="Primary Contact Name" value={people?.contact_person_name} />
          <DataItem label="Primary Contact Title" value={people?.contact_person_title} />
          <DataItem label="Primary Contact Email" value={people?.contact_person_email} />
          <DataItem label="Primary Contact Phone" value={people?.contact_person_phone} />
        </DataSection>

        <DataSection title="Access & Networking" icon={<Globe className="h-5 w-5" />}>
          <DataItem label="Decision Maker Accessibility" value={people?.decision_maker_access} />
          <DataItem label="Warm Introduction Pathways" value={join(people?.warm_intro_pathways, 'warm_intro_pathways')} />
          <DataItem label="Industry Associations" value={join(business?.industry_associations, 'industry_associations')} />
          <DataItem label="Partnership Ecosystem" value={join(tech?.partnership_ecosystem, 'partnership_ecosystem')} />
        </DataSection>

        <DataSection title="Proof Points" icon={<Award className="h-5 w-5" />}>
          <DataItem label="Case Studies" value={join(business?.case_studies, 'case_studies')} />
          <DataItem label="Customer Testimonials" value={join(company.customer_testimonials, 'customer_testimonials')} />
        </DataSection>

        <DataSection title="Future Outlook" icon={<TrendingUp className="h-5 w-5" />}>
          <DataItem label="Future Projections" value={business?.future_projections} />
          <DataItem label="Strategic Priorities" value={join(business?.strategic_priorities, 'strategic_priorities')} />
          <DataItem label="Mission Clarity" value={culture?.mission_clarity} />
          <DataItem label="Sustainability & CSR" value={join(culture?.sustainability_csr, 'sustainability_csr')} />
          <DataItem label="Crisis Behavior" value={culture?.crisis_behavior} />
        </DataSection>
      </TabsContent>
    </Tabs>
  );
};
