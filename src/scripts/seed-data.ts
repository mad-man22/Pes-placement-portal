import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { mufgData } from '../data/companyData';

// Determine the root directory relative to this script
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../');

// Read .env file
const envPath = path.join(rootDir, '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');

// Parse .env using regex
const getEnvVar = (key: string) => {
    const match = envContent.match(new RegExp(`${key}=(.*)`));
    return match ? match[1].trim() : '';
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
const supabaseKey = getEnvVar('VITE_SUPABASE_ANON_KEY');

if (!supabaseUrl || !supabaseKey) {
    console.error('Could not find Supabase credentials in .env file');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedData() {
    console.log('Seeding data...');

    const c = mufgData;
    const shortName = c.basics.shortName;

    // 1. Insert into 'companies' table
    // Check if exists
    const { data: existing } = await supabase
        .from('companies')
        .select('company_id')
        .eq('short_name', shortName)
        .single();

    let companyId: number;

    const companyData = {
        name: c.basics.companyName,
        short_name: c.basics.shortName,
        logo_url: c.basics.logo,
        category: c.basics.category,
        incorporation_year: c.basics.yearOfIncorporation,
        overview_text: c.companyNarrative.overview,
        nature_of_company: c.basics.natureOfCompany,
        headquarters_address: c.basics.headquarters,
        operating_countries: c.geographicPresence.countriesOperatingIn,
        office_count: c.geographicPresence.numberOfOffices,
        office_locations: c.geographicPresence.officeLocations,
        employee_size: c.peopleTalent.employeeSize,
        vision_statement: c.companyNarrative.vision,
        mission_statement: c.companyNarrative.mission,
        core_values: c.companyNarrative.values,
        recent_news: c.companyNarrative.recentNews,
        website_url: c.digitalPresence.websiteUrl,
        linkedin_url: c.digitalPresence.linkedInUrl,
        twitter_handle: c.digitalPresence.twitterHandle,
        facebook_url: c.digitalPresence.facebookUrl,
        instagram_url: c.digitalPresence.instagramUrl,
        primary_contact_email: c.contactInfo.primaryContactEmail,
        primary_phone_number: c.contactInfo.primaryContactPhone,
        regulatory_status: c.riskCompliance.regulatoryStatus,
        legal_issues: c.riskCompliance.legalIssues,
        esg_ratings: c.sustainability.esgPractices,
        supply_chain_dependencies: c.operations.supplyChainDependencies,
        geopolitical_risks: c.operations.geopoliticalRisks,
        macro_risks: c.operations.macroRisks,
        carbon_footprint: c.sustainability.carbonFootprint,
        ethical_sourcing: c.sustainability.ethicalSourcing,
        marketing_video_url: c.digitalPresence.marketingVideos,
        customer_testimonials: c.proofPoints.customerTestimonial
    };

    if (existing) {
        companyId = existing.company_id;
        console.log(`Company ${shortName} exists (ID: ${companyId}). Updating base details...`);
        await supabase.from('companies').update(companyData).eq('company_id', companyId);
    } else {
        console.log(`Inserting company ${shortName}...`);
        const { data, error } = await supabase.from('companies').insert(companyData).select('company_id').single();
        if (error) { console.error('Error inserting company:', error); return; }
        companyId = data.company_id;
        console.log(`Inserted company. ID: ${companyId}`);
    }

    // Helper to upsert related tables based on company_id
    // Since we don't have unique keys on related tables other than ID, we'll delete and re-insert for simplicity of seeding
    // or check if exists by company_id and update.

    const upsertRelated = async (table: string, data: any) => {
        // Check existence
        const { data: relExisting } = await supabase.from(table).select('id').eq('company_id', companyId).single();
        if (relExisting) {
            await supabase.from(table).update(data).eq('id', relExisting.id);
        } else {
            await supabase.from(table).insert({ ...data, company_id: companyId });
        }
    };

    // 2. Company Brand Reputation
    await upsertRelated('company_brand_reputation', {
        website_quality: c.digitalPresence.qualityOfWebsite,
        website_rating: c.digitalPresence.websiteRating,
        website_traffic_rank: c.digitalPresence.websiteTrafficRank,
        social_media_followers: c.digitalPresence.socialMediaFollowers,
        glassdoor_rating: c.digitalPresence.glassdoorRating,
        indeed_rating: c.digitalPresence.indeedRating,
        google_rating: c.digitalPresence.googleReviewsRating,
        awards_recognitions: c.reputation.awards,
        brand_sentiment_score: c.reputation.brandSentimentScore,
        event_participation: c.reputation.eventParticipation
    });

    // 3. Company Business
    await upsertRelated('company_business', {
        pain_points_addressed: c.businessModel.painPointsBeingAddressed,
        focus_sectors: c.businessModel.focusSectors,
        offerings_description: c.businessModel.servicesOfferings,
        top_customers: c.businessModel.topCustomers,
        core_value_proposition: c.businessModel.coreValueProposition,
        unique_differentiators: c.strategyCulture.uniqueDifferentiators,
        competitive_advantages: c.strategyCulture.competitiveAdvantages,
        weaknesses_gaps: c.strategyCulture.weaknessesGaps,
        key_challenges_needs: c.strategyCulture.keyChallenges,
        key_competitors: c.competitiveLandscape.keyCompetitors,
        market_share_percentage: c.financials.marketShare,
        sales_motion: c.salesGrowth.salesMotion,
        customer_concentration_risk: c.salesGrowth.customerConcentrationRisk,
        exit_strategy_history: c.market.exitStrategyHistory,
        benchmark_vs_peers: c.benchmarking.benchmarkVsPeers,
        future_projections: c.forecasting.futureProjections,
        strategic_priorities: c.forecasting.strategicPriorities,
        industry_associations: c.network.industryAssociations,
        case_studies: c.proofPoints.caseStudies,
        go_to_market_strategy: c.goToMarket.goToMarketStrategy,
        innovation_roadmap: c.innovation.innovationRoadmap,
        product_pipeline: c.innovation.productPipeline,
        tam: c.market.totalAddressableMarket,
        sam: c.market.serviceableAddressableMarket,
        som: c.market.serviceableObtainableMarket
    });

    // 4. Company Compensation
    await upsertRelated('company_compensation', {
        leave_policy: c.workLifeBalance.leavePolicy,
        health_support: c.safetyWellbeing.healthSupport,
        fixed_vs_variable_pay: c.compensationBenefits.fixedVsVariablePay,
        bonus_predictability: c.compensationBenefits.bonusPredictability,
        esops_incentives: c.compensationBenefits.esopsLongTermIncentives,
        family_health_insurance: c.compensationBenefits.familyHealthInsurance,
        relocation_support: c.compensationBenefits.relocationSupport,
        lifestyle_benefits: c.compensationBenefits.lifestyleWellnessBenefits
    });

    // 5. Company Culture
    await upsertRelated('company_culture', {
        hiring_velocity: c.peopleTalent.hiringVelocity,
        employee_turnover: c.peopleTalent.employeeTurnover,
        avg_retention_tenure: c.peopleTalent.averageRetentionTenure,
        diversity_metrics: c.peopleTalent.diversityMetrics,
        work_culture_summary: c.culturePeople.workCulture,
        manager_quality: c.culturePeople.managerQuality,
        psychological_safety: c.culturePeople.psychologicalSafety,
        feedback_culture: c.culturePeople.feedbackCulture,
        diversity_inclusion_score: c.culturePeople.diversityInclusion,
        ethical_standards: c.culturePeople.ethicalStandards,
        burnout_risk: c.workLifeBalance.burnoutRisk,
        layoff_history: c.companyStabilityReputation.layoffHistory,
        mission_clarity: c.valuesAlignment.missionClarity,
        sustainability_csr: c.valuesAlignment.sustainabilityAndCsr,
        crisis_behavior: c.valuesAlignment.crisisBehavior
    });

    // 6. Company Financials
    await upsertRelated('company_financials', {
        annual_revenue: c.financials.annualRevenues,
        annual_profit: c.financials.annualProfits,
        revenue_mix: c.financials.revenueMix,
        valuation: c.financials.companyValuation,
        yoy_growth_rate: c.financials.yearOverYearGrowth,
        profitability_status: c.financials.profitabilityStatus,
        key_investors: c.funding.keyInvestors,
        recent_funding_rounds: c.funding.recentFundingRounds,
        total_capital_raised: c.funding.totalCapitalRaised,
        customer_acquisition_cost: c.salesGrowth.customerAcquisitionCost,
        customer_lifetime_value: c.salesGrowth.customerLifetimeValue,
        cac_ltv_ratio: c.salesGrowth.cacLtvRatio,
        churn_rate: c.salesGrowth.churnRate,
        net_promoter_score: c.salesGrowth.netPromoterScore,
        burn_rate: c.salesGrowth.burnRate,
        runway_months: c.salesGrowth.runway,
        burn_multiplier: c.salesGrowth.burnMultiplier
    });

    // 7. Company Logistics
    await upsertRelated('company_logistics', {
        remote_policy_details: c.peopleTalent.remoteWorkPolicy, // or workLifeBalance.remoteHybridOnsite
        typical_hours: c.workLifeBalance.typicalWorkingHours,
        overtime_expectations: c.workLifeBalance.overtimeExpectations,
        weekend_work: c.workLifeBalance.weekendWork,
        flexibility_level: c.workLifeBalance.remoteHybridOnsite, // Using this as proxy
        location_centrality: c.locationCommute.centralVsPeripheral,
        public_transport_access: c.locationCommute.publicTransportAccess,
        cab_policy: c.locationCommute.cabAvailability,
        airport_commute_time: c.locationCommute.commuteTimeFromAirport,
        office_zone_type: c.locationCommute.officeZoneType,
        area_safety: c.safetyWellbeing.areaSafety,
        safety_policies: c.safetyWellbeing.companySafetyPolicies,
        infrastructure_safety: c.safetyWellbeing.officeInfrastructureSafety,
        emergency_preparedness: c.safetyWellbeing.emergencyResponsePreparedness
    });

    // 8. Company People
    await upsertRelated('company_people', {
        ceo_name: c.leadership.ceoName,
        ceo_linkedin_url: c.leadership.ceoLinkedInUrl,
        key_leaders: c.leadership.keyBusinessLeaders,
        warm_intro_pathways: c.leadership.warmIntroductionPathways,
        decision_maker_access: c.leadership.decisionMakerAccessibility,
        contact_person_name: c.contactInfo.primaryContactName,
        contact_person_title: c.contactInfo.primaryContactTitle,
        contact_person_email: c.contactInfo.primaryContactEmail,
        contact_person_phone: c.contactInfo.primaryContactPhone,
        board_members: c.leadership.boardOfDirectors
    });

    // 9. Company Talent Growth
    await upsertRelated('company_talent_growth', {
        training_spend: c.peopleTalent.trainingDevelopmentSpend,
        onboarding_quality: c.learningGrowth.onboardingTrainingQuality,
        learning_culture: c.learningGrowth.learningCulture,
        exposure_quality: c.learningGrowth.exposureQuality,
        mentorship_availability: c.learningGrowth.mentorshipAvailability,
        internal_mobility: c.learningGrowth.internalMobility,
        promotion_clarity: c.learningGrowth.promotionClarity,
        tools_access: c.learningGrowth.toolsTechnologyAccess,
        role_clarity: c.roleWorkQuality.roleClarity,
        early_ownership: c.roleWorkQuality.earlyOwnership,
        work_impact: c.roleWorkQuality.workImpact,
        execution_thinking_balance: c.roleWorkQuality.executionVsThinkingBalance,
        automation_level: c.roleWorkQuality.automationLevel,
        cross_functional_exposure: c.roleWorkQuality.crossFunctionalExposure,
        company_maturity: c.companyStabilityReputation.companyMaturity,
        brand_value: c.companyStabilityReputation.brandValue,
        client_quality: c.companyStabilityReputation.clientQuality,
        exit_opportunities: c.longTermCareerSignaling.exitOpportunities,
        skill_relevance: c.longTermCareerSignaling.skillRelevance,
        external_recognition: c.longTermCareerSignaling.externalRecognition,
        network_strength: c.longTermCareerSignaling.networkStrength,
        global_exposure: c.longTermCareerSignaling.globalExposure
    });

    // 10. Company Technologies
    await upsertRelated('company_technologies', {
        technology_partners: c.competitiveLandscape.technologyPartners,
        intellectual_property: c.innovation.intellectualProperty,
        r_and_d_investment: c.innovation.rdInvestment,
        ai_ml_adoption_level: c.innovation.aiMlAdoptionLevel,
        tech_stack: c.operations.techStack,
        cybersecurity_posture: c.operations.cybersecurityPosture,
        partnership_ecosystem: c.market.partnershipEcosystem,
        tech_adoption_rating: c.benchmarking.industryBenchmarkTechAdoption
    });

    console.log('Seeding complete!');
}

seedData();
