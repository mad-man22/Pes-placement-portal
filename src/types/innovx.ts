export interface InnovXMaster {
    company_name: string;
    industry: string;
    sub_industry: string;
    core_business_model: string;
    target_market: string;
    geographic_focus: string;
}

export interface IndustryTrend {
    trend_name: string;
    trend_description: string;
    time_horizon_years: number;
    trend_drivers: string[];
    impact_areas: string[];
    strategic_importance: string;
}

export interface InnovationRoadmapItem {
    innovation_theme: string;
    problem_statement: string;
    target_customer: string;
    innovation_type: string;
    time_horizon: string;
    expected_outcome: string;
    required_capabilities: string[];
    dependent_trend_names: string[];
}

export interface Competitor {
    competitor_name: string;
    competitor_type: string;
    core_strength: string;
    market_positioning: string;
    bet_name: string;
    bet_description: string;
    innovation_category: string;
    futuristic_level: string;
    strategic_objective: string;
    threat_level: string;
}

export interface StrategicPillar {
    cto_vision_statement: string;
    pillar_name: string;
    pillar_description: string;
    focus_area: string;
    key_technologies: string[];
    strategic_risks: string;
    strategic_assumptions: string;
}

export interface InnovXProject {
    project_name: string;
    problem_statement: string;
    target_users: string;
    innovation_objective: string;
    tier_level: string;
    differentiation_factor: string;
    aligned_pillar_names: string[];
    architecture_style: string;
    backend_technologies: string[];
    frontend_technologies: string[];
    ai_ml_technologies: string[];
    data_storage_processing: string;
    integrations_apis: string[];
    infrastructure_cloud: string;
    security_compliance: string;
    primary_use_case: string;
    secondary_use_cases: string[];
    scenario_description: string;
    user_journey_summary: string;
    business_value: string;
    success_metrics: string[];
}

export interface InnovXData {
    innovx_master: InnovXMaster;
    industry_trends: IndustryTrend[];
    innovation_roadmap: InnovationRoadmapItem[];
    competitive_landscape: Competitor[];
    strategic_pillars: StrategicPillar[];
    innovx_projects: InnovXProject[];
}
