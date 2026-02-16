import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Users, TrendingUp, ArrowRight } from "lucide-react";
import { Company } from "@/data/companyData";

interface CompanyCardProps {
  company: Company;
}

export const CompanyCard = ({ company }: CompanyCardProps) => {
  const categoryColors: Record<string, string> = {
    Enterprise: "bg-category-enterprise/10 text-category-enterprise border-category-enterprise/20",
    Startup: "bg-category-startup/10 text-category-startup border-category-startup/20",
    "Scale-up": "bg-category-scaleup/10 text-category-scaleup border-category-scaleup/20",
  };

  const logoUrl = company.logos?.[0]?.logo_url;
  const financials = company.financials?.[0];

  const formatEmployeeSize = (size: string) => {
    if (!size) return "N/A";
    if (/^[\d,]+$/.test(size)) {
      return parseInt(size.replace(/,/g, "")).toLocaleString() + " employees";
    }
    if (size.toLowerCase().includes("employee")) return size;
    return size + " employees";
  };

  return (
    <Link to={`/company/${company.short_name.toLowerCase()}`}>
      <Card className="group relative overflow-hidden bg-white/40 dark:bg-black/40 backdrop-blur-md shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full border-0 ring-1 ring-black/5">
        {/* Gradient Border Line */}
        <div className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-br from-indigo-300/10 via-purple-300/10 to-pink-300/10 -z-10 opacity-70 group-hover:opacity-100 group-hover:from-indigo-200 group-hover:via-purple-200 group-hover:to-pink-200 transition-all duration-500" />

        {/* Gradient Glow on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <CardContent className="p-5 relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-white/80 dark:bg-white/10 shadow-inner flex items-center justify-center overflow-hidden flex-shrink-0 border border-white/20 group-hover:scale-105 transition-transform duration-300">
              {logoUrl && logoUrl !== "NA" ? (
                <img
                  src={logoUrl}
                  alt={company.short_name}
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <Building2 className={`h-6 w-6 text-muted-foreground ${logoUrl && logoUrl !== "NA" ? 'hidden' : ''}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-foreground truncate group-hover:text-primary transition-colors">
                {company.short_name}
              </h3>
              <p className="text-sm text-muted-foreground truncate">
                {company.name}
              </p>
            </div>
          </div>

          {/* Category Badge */}
          <div className="mb-4">
            <Badge
              variant="outline"
              className={`${categoryColors[company.category] || "bg-secondary"} border-0 shadow-sm`}
            >
              {company.category}
            </Badge>
          </div>

          {/* Quick Info */}
          <div className="space-y-2 text-sm bg-white/30 dark:bg-black/30 p-3 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0 text-primary/70" />
              <span className="truncate">{company.headquarters_address.split(",").pop()?.trim()}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4 flex-shrink-0 text-purple-500/70" />
              <span>{formatEmployeeSize(company.employee_size)}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="h-4 w-4 flex-shrink-0 text-green-500/70" />
              <span>{financials?.yoy_growth_rate || "N/A"} YoY Growth</span>
            </div>
          </div>

          {/* Focus Sectors Tags */}
          {company.business?.[0]?.focus_sectors && company.business[0].focus_sectors.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5 h-[52px] content-start overflow-hidden">
              {company.business[0].focus_sectors.slice(0, 3).map((sector, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="text-[10px] h-5 px-1.5 bg-secondary/50 text-secondary-foreground/80 hover:bg-secondary/70 border-0"
                >
                  {sector.focus_sectors}
                </Badge>
              ))}
              {company.business[0].focus_sectors.length > 3 && (
                <span className="text-[10px] text-muted-foreground self-center">+{company.business[0].focus_sectors.length - 3} more</span>
              )}
            </div>
          )}

          {/* Spacer to push button down if content is short */}
          <div className="flex-grow"></div>

          {/* View Details */}
          <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
            <span className="text-sm font-semibold text-primary/80 group-hover:text-primary transition-colors">View Profile</span>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
