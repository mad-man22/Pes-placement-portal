export interface Company {
  id?: number; // Optional DB ID
  company_id: number;
  name: string;
  short_name: string;
  logo_url?: string; // Optional since it might be fetched via relation or raw property
  category: string;
  incorporation_year: string;
  nature_of_company: string;
  headquarters_address: string;
  office_count: string;
  employee_size: string;
  website_url: string;
  linkedin_url: string;
  twitter_handle: string;
  facebook_url: string;
  instagram_url: string;
  primary_contact_email: string;
  primary_phone_number: string;
  overview_text: string;
  vision_statement: string;
  mission_statement: string;
  legal_issues: string;
  carbon_footprint: string;

  // Joined/Associated Data
  logos: CompanyLogo[];
  operating_countries: CompanyOperatingCountriesMap[];
  office_locations: CompanyOfficeLocationsMap[];
  core_values: CompanyCoreValues[];
  history: CompanyHistory[];
  marketing_videos: CompanyMarketingVideos[];
  recent_news: CompanyRecentNews[];
  customer_testimonials: CompanyCustomerTestimonials[];

  // Risk & Compliance
  regulatory_status: CompanyRegulatoryStatus[];
  esg_ratings: CompanyEsgRatings[];
  geopolitical_risks: CompanyGeopoliticalRisks[];
  macro_risks: CompanyMacroRisks[];
  ethical_sourcing: CompanyEthicalSourcing[];
  supply_chain_dependencies: CompanySupplyChainDependencies[];

  // Complex Nested Structures
  brand_reputation: CompanyBrandReputation[];
  business: CompanyBusiness[];
  compensation: CompanyCompensation[];
  culture: CompanyCulture[];
  financials: CompanyFinancials[];
  logistics: CompanyLogistics[];
  people: CompanyPeople[];
  talent_growth: CompanyTalentGrowth[];
  technologies: CompanyTechnologies[];
}

// Sub-interfaces
export interface CompanyLogo {
  company_logo_id?: number;
  logo_url: string;
}

export interface CompanyOperatingCountriesMap {
  countries_id?: number; // We might need to fetch the actual country name
  country_name?: string; // Hydrated for UI
}

export interface CompanyOfficeLocationsMap {
  city_id?: number;
  city_name?: string;
}

export interface CompanyCoreValues {
  core_values: string;
}

export interface CompanyHistory {
  history_timeline: string;
}

export interface CompanyMarketingVideos {
  marketing_video_url: string;
}

export interface CompanyRecentNews {
  recent_news: string;
}

export interface CompanyCustomerTestimonials {
  customer_testimonials: string;
}

export interface CompanyRegulatoryStatus {
  regulatory_status: string;
}

export interface CompanyEsgRatings {
  esg_ratings: string;
}

export interface CompanyGeopoliticalRisks {
  geopolitical_risks: string;
}

export interface CompanyMacroRisks {
  macro_risks: string;
}

export interface CompanyEthicalSourcing {
  ethical_sourcing: string;
}

export interface CompanySupplyChainDependencies {
  supply_chain_dependencies: string;
}

// Parent Tables

export interface CompanyBrandReputation {
  brand_reputation_id?: number;
  brand_sentiment_score: string;
  website_quality: string;
  website_rating: string;
  social_media_followers: string;
  glassdoor_rating: string;
  indeed_rating: string;
  google_rating: string;

  // Children
  awards_recognitions: CompanyAwardsRecognitions[];
  event_participation: CompanyEventParticipation[];
  website_traffic_rank: CompanyWebsiteTrafficRank[];
}

export interface CompanyAwardsRecognitions {
  awards_recognitions: string;
}

export interface CompanyEventParticipation {
  event_participation: string;
}

export interface CompanyWebsiteTrafficRank {
  website_traffic_rank: string;
}


export interface CompanyBusiness {
  company_business_id?: number;
  sales_motion: string;
  innovation_roadmap: string;
  future_projections: string;
  market_share_percentage: string;
  tam: string;
  sam: string;
  som: string;
  customer_concentration_risk: string;

  // Children
  core_value_proposition: { core_value_proposition: string }[];
  pain_points_addressed: { pain_points_addressed: string }[];
  unique_differentiators: { unique_differentiators: string }[];
  competitive_advantages: { competitive_advantages: string }[];
  weaknesses_gaps: { weaknesses_gaps: string }[];
  key_challenges_needs: { key_challenges_needs: string }[];
  focus_sectors: { focus_sectors: string }[];
  offerings_description: { offerings_description: string }[];
  go_to_market_strategy: { go_to_market_strategy: string }[];
  product_pipeline: { product_pipeline: string }[];
  strategic_priorities: { strategic_priorities: string }[];
  exit_strategy_history: { exit_strategy_history: string }[];
  top_customers: { top_customers: string }[];
  key_competitors: { key_competitors: string }[];
  benchmark_vs_peers: { benchmark_vs_peers: string }[];
  industry_associations: { industry_associations: string }[];
  case_studies: { case_studies: string }[];
}


export interface CompanyCompensation {
  company_compensation_id?: number;
  fixed_vs_variable_pay: string;
  bonus_predictability: string;

  // Children
  relocation_support: { relocation_support: string }[];
  leave_policy: { leave_policy: string }[];
  health_support: { health_support: string }[];
  family_health_insurance: { family_health_insurance: string }[];
  lifestyle_benefits: { lifestyle_benefits: string }[];
  esops_incentives: { esops_incentives: string }[];
}

export interface CompanyCulture {
  company_culture_id?: number;
  employee_turnover: string;
  avg_retention_tenure: string;
  layoff_history: string;
  manager_quality: string;
  psychological_safety: string;
  mission_clarity: string;
  crisis_behavior: string;
  burnout_risk: string;

  // Children
  hiring_velocity: { hiring_velocity: string }[];
  diversity_metrics: { diversity_metrics: string }[];
  work_culture_summary: { work_culture_summary: string }[];
  feedback_culture: { feedback_culture: string }[];
  diversity_inclusion_score: { diversity_inclusion_score: string }[];
  ethical_standards: { ethical_standards: string }[];
  sustainability_csr: { sustainability_csr: string }[];
}

export interface CompanyFinancials {
  company_financials_id?: number;
  annual_revenue: string;
  annual_profit: string;
  valuation: string;
  yoy_growth_rate: string;
  profitability_status: string;
  total_capital_raised: string;
  customer_acquisition_cost: string;
  customer_lifetime_value: string;
  cac_ltv_ratio: string;
  churn_rate: string;
  net_promoter_score: string;
  burn_rate: string;
  runway_months: string;
  burn_multiplier: string;

  // Children
  revenue_mix: { revenue_mix: string }[];
  key_investors: { key_investors: string }[];
  recent_funding_rounds: { recent_funding_rounds: string }[];
}

export interface CompanyLogistics {
  company_logistics_id?: number;
  typical_hours: string;
  overtime_expectations: string;
  weekend_work: string;
  remote_policy_details: string;
  location_centrality: string;
  airport_commute_time: string;
  office_zone_type: string;

  // Children
  flexibility_level: { flexibility_level: string }[]; // Actually linked to company in Schema? No, wait.
  // Check schema: company_flexibility_level -> company_id directly.
  /*
  CREATE TABLE company_flexibility_level (
      company_flexibility_level_id SERIAL PRIMARY KEY,
      company_id INTEGER NOT NULL REFERENCES companies(company_id),
      flexibility_level TEXT
  );
  */
  // So flexibility_level is a direct child of company, not logistics?
  // Wait, the logic grouping usually puts it under logistics.
  // But the schema says: company_id. 
  // I will put it under Company top level then? Or just group it in TS?
  // Let's stick to the SQL schema structure.

  // Actually, let's allow the TS type to be a bit more flexible or just follow the schema strictly as requested.
  // Schema: company_public_transport_access -> company_logistics_id

  public_transport_access: { public_transport_access: string }[];
  cab_policy: { cab_policy: string }[];
  area_safety: { area_safety: string }[];
  safety_policies: { safety_policies: string }[];
  infrastructure_safety: { infrastructure_safety: string }[];
  emergency_preparedness: { emergency_preparedness: string }[];
}

// Fix: Flexibility Level is direct child of company in SQL
export interface CompanyFlexibilityLevel {
  flexibility_level: string;
}

export interface CompanyPeople {
  company_people_id?: number;
  ceo_linkedin_url: string;
  contact_person_name: string;
  contact_person_title: string;
  contact_person_email: string;
  contact_person_phone: string;
  decision_maker_access: string;
  ceo_name: string;

  // Children
  key_leaders: { key_leaders: string }[];
  board_members: { board_members: string }[];
  warm_intro_pathways: { warm_intro_pathways: string }[];
}

export interface CompanyTalentGrowth {
  company_talent_growth_id?: number;
  training_spend: string;
  onboarding_quality: string;
  internal_mobility: string;
  role_clarity: string;
  early_ownership: string;
  execution_thinking_balance: string;
  automation_level: string;
  company_maturity: string;
  brand_value: string;
  skill_relevance: string;
  exposure_quality: string;
  external_recognition: string;

  // Children
  learning_culture: { learning_culture: string }[];
  mentorship_availability: { mentorship_availability: string }[];
  promotion_clarity: { promotion_clarity: string }[];
  tools_access: { tools_access: string }[];
  work_impact: { work_impact: string }[];
  cross_functional_exposure: { cross_functional_exposure: string }[];
  client_quality: { client_quality: string }[];
  exit_opportunities: { exit_opportunities: string }[];
  network_strength: { network_strength: string }[];
  global_exposure: { global_exposure: string }[];
}

export interface CompanyTechnologies {
  company_technologies_id?: number;
  r_and_d_investment: string;
  ai_ml_adoption_level: string;

  // Children
  tech_stack: { tech_stack: string }[];
  technology_partners: { technology_partners: string }[];
  intellectual_property: { intellectual_property: string }[];
  tech_adoption_rating: { tech_adoption_rating: string }[];
  cybersecurity_posture: { cybersecurity_posture: string }[];
  partnership_ecosystem: { partnership_ecosystem: string }[];
}


// MUFG Data implementation
export const mufgData: Company = {
  company_id: 1,
  name: "Mitsubishi UFJ Financial Group, Inc.",
  short_name: "MUFG",
  category: "Enterprise",
  incorporation_year: "2005",
  nature_of_company: "Public",
  headquarters_address: "2-7-1 Marunouchi, Chiyoda-ku, Tokyo, Japan",
  office_count: "500+",
  employee_size: "160000",
  website_url: "https://www.mufg.jp",
  linkedin_url: "https://www.linkedin.com/company/mufg",
  twitter_handle: "@MUFG",
  facebook_url: "https://www.facebook.com/MUFG",
  instagram_url: "https://www.instagram.com/mufg",
  primary_contact_email: "ir@mufg.jp",
  primary_phone_number: "NA",
  overview_text: "MUFG is one of the world's largest financial groups providing commercial banking, trust banking, securities, asset management, and global corporate and investment banking services with strong presence across Asia, the Americas, and EMEA.",
  vision_statement: "To be the world's most trusted financial group.",
  mission_statement: "Supporting sustainable growth of customers and society through responsible finance and innovation.",
  legal_issues: "Historical regulatory fines and compliance remediation in multiple jurisdictions",
  carbon_footprint: "Net-zero operational emissions target by 2030",

  logos: [{ logo_url: "https://www.mufg.jp/dam/images/common/logo_mufg.png" }],
  operating_countries: [
    { country_name: "Japan" }, { country_name: "United States" }, { country_name: "United Kingdom" },
    { country_name: "Singapore" }, { country_name: "China" }, { country_name: "India" },
    { country_name: "Thailand" }, { country_name: "Australia" }, { country_name: "Germany" }, { country_name: "Brazil" }
  ],
  office_locations: [
    { city_name: "Tokyo" }, { city_name: "New York" }, { city_name: "London" },
    { city_name: "Singapore" }, { city_name: "Hong Kong" }, { city_name: "Mumbai" }, { city_name: "Sydney" }
  ],
  core_values: [{ core_values: "Integrity; Customer focus; Innovation; Global collaboration; Sustainability" }],
  history: [{ history_timeline: "Founded in 2005 through merger of Mitsubishi Tokyo Financial Group and UFJ Holdings" }],
  marketing_videos: [{ marketing_video_url: "https://www.youtube.com/@MUFG" }],
  recent_news: [{ recent_news: "2024,Expanded sustainable finance commitments; 2023,Increased digital banking investments in Asia" }],
  customer_testimonials: [{ customer_testimonials: "Multinational corporate treasury success stories; Government infrastructure finance endorsements" }],

  regulatory_status: [{ regulatory_status: "Basel III compliant; GDPR Compliance; SOC 2; ISO 27001" }],
  esg_ratings: [{ esg_ratings: "MSCI ESG AA rating; Sustainable finance framework" }],
  geopolitical_risks: [{ geopolitical_risks: "Sanctions regimes; Trade conflicts; Cross-border regulatory divergence" }],
  macro_risks: [{ macro_risks: "Interest rate volatility; Global recession; Currency fluctuations" }],
  ethical_sourcing: [{ ethical_sourcing: "Supplier code of conduct; Responsible investment screening" }],
  supply_chain_dependencies: [{ supply_chain_dependencies: "IT vendors; Cloud providers; Financial data providers" }],

  brand_reputation: [{
    brand_sentiment_score: "Positive,strong institutional trust and regulatory reputation",
    website_quality: "Professional, multilingual, investor-focused, clear corporate and sustainability reporting",
    website_rating: "8.5/10",
    website_traffic_rank: "Global Rank 25,000; US Rank 15,000",
    social_media_followers: "500,000",
    glassdoor_rating: "3.8/5",
    indeed_rating: "4.0/5",
    google_rating: "4.2/5",
    awards_recognitions: [{ awards_recognitions: "Euromoney Best Bank Japan; Global Finance Best Trade Finance Bank; Sustainability Award Asia" }],
    event_participation: [{ event_participation: "World Economic Forum; Sibos Banking Conference; Asia Financial Forum" }],
    website_traffic_rank: [{ website_traffic_rank: "Global Rank 25,000" }]
  }],

  business: [{
    sales_motion: "Field Sales",
    innovation_roadmap: "AI risk analytics; Digital trade finance; Cloud banking platforms",
    future_projections: "Revenue projected $85B by 2027",
    market_share_percentage: "8% global corporate banking",
    tam: "$12T global banking and financial services market",
    sam: "$3T",
    som: "5%",
    customer_concentration_risk: "No,diversified global client base",
    core_value_proposition: [{ core_value_proposition: "Global financial stability; Strong Asia-Pacific network; Comprehensive financial solutions; Risk-managed capital services" }],
    pain_points_addressed: [{ pain_points_addressed: "Global trade finance access; Corporate treasury management; Cross-border payments; Risk management solutions; Capital market funding" }],
    unique_differentiators: [{ unique_differentiators: "Strong Japanese and Asian market leadership; Strategic stake in Morgan Stanley; Integrated banking-securities model" }],
    competitive_advantages: [{ competitive_advantages: "Large capital base; Global correspondent network; Regulatory credibility; Long-term institutional relationships" }],
    weaknesses_gaps: [{ weaknesses_gaps: "Exposure to low interest rates in Japan; Legacy IT complexity; Regional revenue concentration" }],
    key_challenges_needs: [{ key_challenges_needs: "Digital transformation; Cybersecurity threats; Global regulatory compliance; Competition from fintechs" }],
    focus_sectors: [{ focus_sectors: "Banking; Capital Markets; Asset Management; Insurance; Financial Technology" }],
    offerings_description: [{ offerings_description: "Retail Banking; Corporate Banking; Investment Banking; Trust Banking; Securities Trading; Asset Management; Payments" }],
    go_to_market_strategy: [{ go_to_market_strategy: "Relationship managers; Global branch network; Institutional partnerships" }],
    product_pipeline: [{ product_pipeline: "API-based banking services; Sustainable finance products" }],
    strategic_priorities: [{ strategic_priorities: "Digital banking expansion; Sustainable finance leadership; Global corporate banking growth" }],
    exit_strategy_history: [{ exit_strategy_history: "Strategic acquisitions and equity partnerships" }],
    top_customers: [{ top_customers: "Multinational Corporations; SMEs; Institutional Investors; Governments; Retail Consumers" }],
    key_competitors: [{ key_competitors: "JPMorgan Chase; Bank of America; HSBC; Citi; SMBC; Mizuho; BNP Paribas; Deutsche Bank" }],
    benchmark_vs_peers: [{ benchmark_vs_peers: "Stronger Asia presence than Citi; Comparable capital strength to JPMorgan; Higher trust ranking in Japan" }],
    industry_associations: [{ industry_associations: "Japanese Bankers Association; World Economic Forum; International Banking Federation" }],
    case_studies: [{ case_studies: "Global infrastructure project financing; Renewable energy funding programs" }],
  }],

  compensation: [{
    fixed_vs_variable_pay: "Mostly fixed",
    bonus_predictability: "Moderate",
    relocation_support: [{ relocation_support: "Housing support; Visa assistance" }],
    leave_policy: [{ leave_policy: "Paid leave; Parental leave; Wellness days" }],
    health_support: [{ health_support: "Health insurance; Mental wellness; OPD" }],
    family_health_insurance: [{ family_health_insurance: "Dependents covered; Global health plans" }],
    lifestyle_benefits: [{ lifestyle_benefits: "Wellness programs; Subsidized meals" }],
    esops_incentives: [{ esops_incentives: "Performance bonuses; Pension plans" }],
  }],

  culture: [{
    employee_turnover: "8% annually",
    avg_retention_tenure: "8 years",
    layoff_history: "Limited workforce restructuring",
    manager_quality: "High",
    psychological_safety: "Moderate",
    mission_clarity: "High",
    crisis_behavior: "Conservative, compliance-driven, and transparent",
    burnout_risk: "Moderate",
    hiring_velocity: [{ hiring_velocity: "Corporate Banking roles ~600; IT & Digital ~500; Risk & Compliance ~400; Operations ~300" }],
    diversity_metrics: [{ diversity_metrics: "30% women globally; Global DEI hiring and leadership programs" }],
    work_culture_summary: [{ work_culture_summary: "Professional; Hierarchical" }],
    feedback_culture: [{ feedback_culture: "Formal reviews; Structured feedback" }],
    diversity_inclusion_score: [{ diversity_inclusion_score: "Gender equity programs; Global inclusion initiatives" }],
    ethical_standards: [{ ethical_standards: "Strong compliance; Regulatory transparency" }],
    sustainability_csr: [{ sustainability_csr: "Green finance; Education funding; Community development" }],
  }],

  financials: [{
    annual_revenue: "$70B (FY2023, estimated consolidated operating revenue)",
    annual_profit: "$10B (FY2023 net income, estimated)",
    valuation: "$90B market capitalization",
    yoy_growth_rate: "6%",
    profitability_status: "Profitable",
    total_capital_raised: "NA",
    customer_acquisition_cost: "High,enterprise relationship-based",
    customer_lifetime_value: "Very High,multi-decade institutional relationships",
    cac_ltv_ratio: ">10:1",
    churn_rate: "<5%",
    net_promoter_score: "45",
    burn_rate: "Not Applicable,cash-flow positive",
    runway_months: "NA",
    burn_multiplier: "<1.0",
    revenue_mix: [{ revenue_mix: "RetailBanking 35%;Corporate&InvestmentBanking 40%;AssetManagement 15%;Securities&Other 10%" }],
    key_investors: [{ key_investors: "Japanese institutional investors; Government Pension Investment Fund; Global mutual funds" }],
    recent_funding_rounds: [{ recent_funding_rounds: "Public equity markets; Corporate bond issuances" }],
  }],

  logistics: [{
    typical_hours: "Fixed",
    overtime_expectations: "Occasional",
    weekend_work: "Rare",
    remote_policy_details: "Hybrid; On-site",
    location_centrality: "Central business districts",
    airport_commute_time: "30 minutes",
    office_zone_type: "Financial district",
    public_transport_access: [{ public_transport_access: "Metro; Bus; Rail" }],
    cab_policy: [{ cab_policy: "Ride-hailing; Company transport" }],
    area_safety: [{ area_safety: "Secure; Monitored" }],
    safety_policies: [{ safety_policies: "Workplace safety; Travel security" }],
    infrastructure_safety: [{ infrastructure_safety: "Fire compliant; Secure access" }],
    emergency_preparedness: [{ emergency_preparedness: "Medical teams; Evacuation drills" }],
    flexibility_level: [{ flexibility_level: "Medium" }], // inferred from hybrid
  }],

  people: [{
    ceo_linkedin_url: "NA",
    contact_person_name: "Hironori Kamezawa",
    contact_person_title: "President & Group CEO",
    contact_person_email: "kamezawa@us.mufg.jp",
    contact_person_phone: "(212) 295-3820",
    decision_maker_access: "Low,highly regulated and centralized governance structure",
    ceo_name: "Hironori Kamezawa",
    key_leaders: [{ key_leaders: "Hironori Kamezawa,CEO; Jean Raby,Head of Global Banking; Mike Omi,COO" }],
    board_members: [{ board_members: "Hironori Kamezawa; Kanetsugu Mike; Outside Independent Directors" }],
    warm_intro_pathways: [{ warm_intro_pathways: "Global banking alumni; Morgan Stanley network; Corporate client relationships" }],
  }],

  talent_growth: [{
    training_spend: "$1,200 per employee/year",
    onboarding_quality: "Strong",
    internal_mobility: "Moderate",
    role_clarity: "High",
    early_ownership: "Moderate",
    execution_thinking_balance: "Execution-focused",
    automation_level: "High",
    company_maturity: "Mature enterprise",
    brand_value: "Strong institutional brand",
    skill_relevance: "High",
    exposure_quality: "High",
    external_recognition: "Top-tier global bank",
    learning_culture: [{ learning_culture: "Banking certifications; Leadership training; Digital upskilling" }],
    mentorship_availability: [{ mentorship_availability: "Senior mentorship; Global rotation programs" }],
    promotion_clarity: [{ promotion_clarity: "Merit-based; Structured" }],
    tools_access: [{ tools_access: "Banking platforms; Analytics tools; Cloud systems" }],
    work_impact: [{ work_impact: "Global finance; Client growth" }],
    cross_functional_exposure: [{ cross_functional_exposure: "Risk; IT; Business units" }],
    client_quality: [{ client_quality: "Fortune 500 firms; Governments; Global banks" }],
    exit_opportunities: [{ exit_opportunities: "Global banks; Fintechs; Regulatory bodies" }],
    network_strength: [{ network_strength: "Global alumni; Executive network" }],
    global_exposure: [{ global_exposure: "International clients; Global offices" }],
  }],

  technologies: [{
    r_and_d_investment: "$1.5B annually",
    ai_ml_adoption_level: "Moderate to High,fraud detection, risk modeling, credit analytics, customer service automation",
    tech_stack: [{ tech_stack: "Core banking systems; IBM mainframes; SAP ERP; Microsoft Azure; Salesforce" }],
    technology_partners: [{ technology_partners: "IBM; Accenture; Microsoft; Oracle; SAP" }],
    intellectual_property: [{ intellectual_property: "Core banking platforms; Digital trade finance systems; Payment infrastructure" }],
    tech_adoption_rating: [{ tech_adoption_rating: "Enterprise Leader; Digital Transformer" }],
    cybersecurity_posture: [{ cybersecurity_posture: "ISO 27001; SOC 2; Multi-layer financial cybersecurity framework" }],
    partnership_ecosystem: [{ partnership_ecosystem: "Morgan Stanley; IBM; Microsoft; Fintech startups" }],
  }],
};

export const companies: Company[] = [mufgData];

// Helper function to get company by short name
export const getCompanyByShortName = (shortName: string): Company | undefined => {
  return companies.find(c => c.short_name.toLowerCase() === shortName.toLowerCase());
};
