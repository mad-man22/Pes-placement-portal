import { Building2, Users, Globe, DollarSign, TrendingUp, Award } from "lucide-react";
import { Company } from "@/data/companyData";

interface StatsCardsProps {
  company: Company;
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext?: string;
}

const StatCard = ({ icon, label, value, subtext }: StatCardProps) => (
  <div className="relative bg-white/40 dark:bg-black/20 border-0 ring-1 ring-black/5 backdrop-blur-md rounded-xl p-5 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
    {/* Gradient Border Line - Ultra Light Pastel (Static) */}
    <div className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-br from-indigo-300/10 via-purple-300/10 to-pink-300/10 -z-10 opacity-100" />

    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-100"></div>
    <div className="relative z-10 flex items-start justify-between">
      <div className="space-y-1">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="text-xl md:text-2xl font-bold text-foreground tracking-tight">{value}</p>
        {subtext && <p className="text-xs text-muted-foreground/80 mt-1 font-medium">{subtext}</p>}
      </div>
      <div className="p-2.5 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
    </div>
  </div>
);

export const StatsCards = ({ company }: StatsCardsProps) => {
  const financials = company.financials?.[0];
  const culture = company.culture?.[0];
  const brand = company.brand_reputation?.[0];
  const business = company.business?.[0];

  const formatEmployeeSize = (size: string) => {
    if (!size) return "N/A";
    if (/^[\d,]+$/.test(size)) {
      return parseInt(size.replace(/,/g, "")).toLocaleString();
    }
    if (size.toLowerCase().includes("employee")) return size.replace(/ employees?/i, "").trim();
    return size;
  };

  const stats: StatCardProps[] = [
    {
      icon: <Users className="h-5 w-5" />,
      label: "Employees",
      value: formatEmployeeSize(company.employee_size),
      subtext: (culture?.avg_retention_tenure || "NA") + " avg tenure"
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      label: "Annual Revenue",
      value: financials?.annual_revenue || "NA",
      subtext: financials?.profitability_status || "NA"
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      label: "YoY Growth",
      value: financials?.yoy_growth_rate || "NA",
      subtext: business?.future_projections || "NA"
    },
    {
      icon: <Globe className="h-5 w-5" />,
      label: "Global Offices",
      value: company.office_count,
      subtext: (company.operating_countries?.length || 0) + " countries"
    },
    {
      icon: <Award className="h-5 w-5" />,
      label: "Glassdoor Rating",
      value: brand?.glassdoor_rating || "NA",
      subtext: "Employee reviews"
    },
    {
      icon: <Building2 className="h-5 w-5" />,
      label: "Market Cap",
      value: financials?.valuation || "NA",
      subtext: (business?.market_share_percentage || "NA") + " market share"
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
      {stats.map((stat, idx) => (
        <StatCard key={idx} {...stat} />
      ))}
    </div>
  );
};
