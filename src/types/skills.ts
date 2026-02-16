export interface SkillSet {
    skill_set_id: number;
    skill_set_name: string;
    short_name: string | null;
    skill_set_description: string | null;
}

export interface ProficiencyLevel {
    proficiency_level_id: number;
    proficiency_name: string;
    proficiency_code: string;
    proficiency_description: string | null;
}

export interface SkillSetTopic {
    topic_id: number;
    skill_set_id: number; // Foreign Key to skill_set_master
    level_number: number;
    topics: string; // Text field possibly containing multiple topics or a description
    // In the future, we might want to split this if it's comma separated, but for now treating as string
}

export interface CompanySkillLevel {
    id: number;
    company_id: number; // Foreign Key to companies
    skill_set_id: number; // Foreign Key to skill_set_master
    required_level: number;
    required_proficiency_level_id: number; // Foreign Key to proficiency_levels

    // Joins
    skill_set?: SkillSet;
    proficiency_level?: ProficiencyLevel;
    topics?: SkillSetTopic[]; // We can attach topics that match the required_level if needed
}

export interface EnrichedCompanySkillLevel extends CompanySkillLevel {
    skill_set_name: string;
    proficiency_name: string;
    proficiency_code: string;
    topics_text?: string;
}
