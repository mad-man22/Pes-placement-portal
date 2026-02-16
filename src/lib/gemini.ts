import { GoogleGenerativeAI } from "@google/generative-ai";
import { Company } from '@/data/companyData';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export interface AnalysisResult {
  matchScore: number;
  matchingSkills: string[];
  missingSkills: {
    skill: string;
    resourceName: string;
    resourceUrl: string;
  }[];
  strengths: string[];
  gaps: string[];
  recommendation: string;
}

export interface SuggestionResult {
  rankedMatches: {
    companyName: string;
    matchScore: number;
    reason: string;
    missingSkills: {
      skill: string;
      resourceName: string;
      resourceUrl: string;
    }[];
  }[];
  summary: string;
}

// Fallback logic could be added here, but for now we try the specific version
const MODEL_NAME = "gemini-flash-latest";

export const analyzeSkillFit = async (
  userSkills: string,
  company: Company
): Promise<AnalysisResult> => {
  if (!API_KEY) {
    throw new Error("Gemini API Key is missing. Please add VITE_GEMINI_API_KEY to .env");
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const companyContext = `
    Company: ${company.name}
    Overview: ${company.overview_text}
    Industry: ${company.business?.[0]?.focus_sectors?.[0]?.focus_sectors || 'N/A'}
    Tech Stack: ${company.technologies?.[0]?.tech_stack?.[0]?.tech_stack || 'N/A'}
    Innovation: ${company.technologies?.[0]?.intellectual_property?.[0]?.intellectual_property || 'N/A'}
    Role Expectations: ${company.talent_growth?.[0]?.role_clarity || 'N/A'}, ${company.talent_growth?.[0]?.work_impact?.[0]?.work_impact || 'N/A'}
    Culture: ${company.culture?.[0]?.work_culture_summary?.[0]?.work_culture_summary || 'N/A'}
  `;

  const prompt = `
    You are an expert career coach and technical recruiter.
    Analyze the candidate's fit for the following company based on their provided skills/resume text.
    
    TARGET COMPANY DATA:
    ${companyContext}

    CANDIDATE INPUT (Skills/Resume):
    "${userSkills}"

    Task:
    1. Identify key technical and soft skills required by the company based on its tech stack and culture.
    2. Extract skills from the candidate's input.
    3. Compare them and calculate a personalized Match Score (0-100).
    4. List matching skills.
    5. List MISSING critical skills. For each missing skill, provide a high-quality free learning resource (URL) and a short name for the resource (e.g. "React Docs", "Coursera Course").
    6. List candidate strengths and gaps/areas for improvement.
    7. Provide a brief, actionable recommendation on whether to apply and what to emphasize.

    Output must be typically valid JSON with this exact schema (do not include markdown code blocks around it):
    {
      "matchScore": number,
      "matchingSkills": ["skill1", "skill2"],
      "missingSkills": [
        { "skill": "Skill Name", "resourceName": "Source Name", "resourceUrl": "https://..." }
      ],
      "strengths": ["strength1", "strength2"],
      "gaps": ["gap1", "gap2"],
      "recommendation": "string"
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

    return JSON.parse(cleanText) as AnalysisResult;
  } catch (error: any) {
    console.error("Gemini Analysis Failed:", error);
    throw new Error(`Failed to analyze fit using ${MODEL_NAME}. Details: ${error.message}`);
  }
};

export const suggestBestFits = async (
  userSkills: string,
  companies: Company[]
): Promise<SuggestionResult> => {
  if (!API_KEY) {
    throw new Error("Gemini API Key is missing. Please add VITE_GEMINI_API_KEY to .env");
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const companyContext = companies.map(c => `
    ID: ${c.short_name}
    Name: ${c.name}
    Tech Stack: ${c.technologies?.[0]?.tech_stack?.[0]?.tech_stack || 'N/A'}
    Sector: ${c.business?.[0]?.focus_sectors?.[0]?.focus_sectors || 'N/A'}
    Culture: ${c.culture?.[0]?.work_culture_summary?.[0]?.work_culture_summary || 'N/A'}
  `).join("\n---\n");

  const prompt = `
    You are an expert technical recruiter matching a candidate to the best companies.
    
    CANDIDATE SKILLS/RESUME:
    "${userSkills}"

    AVAILABLE COMPANIES:
    ${companyContext}

    Task:
    1. Analyze the candidate's skills against ALL provided companies.
    2. Select the top 3 companies that are the best fit.
    3. For each, assign a match score (0-100) and explain why (matching tech, culture fit, etc.).
    4. Also list key missing skills for each top match.
    5. For each missing skill, provide a high-quality learning resource URL and name.

    Output JSON schema (strict), no markdown blocks:
    {
      "rankedMatches": [
        {
          "companyName": "Exact Company Name from list",
          "matchScore": number,
          "reason": "Brief explanation of fit",
          "missingSkills": [
             { "skill": "Skill Name", "resourceName": "Source Name", "resourceUrl": "https://..." }
          ]
        }
      ],
      "summary": "Brief overall career advice based on these matches."
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText) as SuggestionResult;
  } catch (error: any) {
    console.error("Gemini Suggestion Failed:", error);
    throw new Error(`Failed to suggest fits using ${MODEL_NAME}. Details: ${error.message}`);
  }
};
