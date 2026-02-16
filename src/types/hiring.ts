export interface SkillSet {
    skill_set_code: string;
    typical_questions: string;
}

export interface HiringRound {
    round_number: number;
    round_name: string;
    round_category: string;
    evaluation_type: string;
    assessment_mode: string;
    skill_sets: SkillSet[];
}

export interface JobRoleDetail {
    opportunity_type: string;
    role_title: string;
    role_category: string;
    job_description: string;
    compensation: string;
    ctc_or_stipend: number;
    bonus: string;
    benefits_summary: string;
    hiring_rounds: HiringRound[];
}

export interface HiringData {
    company_name: string;
    job_role_details: JobRoleDetail[];
}
