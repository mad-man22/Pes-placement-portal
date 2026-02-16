export interface HiringRound {
    round_number: number;
    round_name: string;
    round_category: string;
    evaluation_type: string;
    assessment_mode: string;
    skill_sets: {
        skill_set_code: string;
        typical_questions: string;
    }[];
}

export interface JobRole {
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

export interface CompanyHiring {
    company_name: string;
    company_id: number;
    job_role_details: JobRole[];
}

// Keeping this purely for reference types or fallback
export const hiringData: CompanyHiring[] = [];

export const SKILL_SET_LABELS: Record<string, string> = {
    DSA: "Data Structures & Algorithms",
    COD: "Coding",
    APTI: "Aptitude & Problem Solving",
    COMM: "Communication Skills",
    OOD: "Object-Oriented Design",
    AINE: "AI Native Engineering",
    SQL: "SQL & Database Design",
    SYSD: "System Design & Architecture",
    DEVOPS: "DevOps & Cloud",
    SWE: "Software Engineering",
    NETW: "Computer Networking",
    OS: "Operating Systems",
};

export const ROUND_ICONS: Record<string, string> = {
    "Coding Test": "💻",
    "Interview": "🎙️",
    "Hackathon": "🧩",
    "HR": "🧑‍💼",
};

export const SKILL_SET_CODES = Object.keys(SKILL_SET_LABELS);

// Cross-company skill ratings (for the Hiring Skill Sets homepage)
export interface SkillRating {
    company_id: number;
    skill_code: string;
    rating: number; // 1-10 scale
    bloom_code: string; // Bloom's Taxonomy
}

const bloomCodes = ["RE", "UN", "AP", "AN", "EV", "CR"];

export const skillRatings: SkillRating[] = [];
// Generate sample ratings for companies 1-20
for (let i = 1; i <= 20; i++) {
    SKILL_SET_CODES.forEach(code => {
        const rating = Math.floor(Math.random() * 6) + 4; // 4-9
        const bloom = bloomCodes[Math.floor(Math.random() * bloomCodes.length)];
        skillRatings.push({ company_id: i, skill_code: code, rating, bloom_code: bloom });
    });
}

export const BLOOM_LABELS: Record<string, string> = {
    RE: "Remember",
    UN: "Understand",
    AP: "Apply",
    AN: "Analyze",
    EV: "Evaluate",
    CR: "Create",
};
