import { MapPin, Calendar, Users, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Company } from "@/data/companyData";

interface CompanyHeaderProps {
  company: Company;
}

export const CompanyHeader = ({ company }: CompanyHeaderProps) => {
  const logoUrl = company.logos?.[0]?.logo_url;

  const formatEmployeeSize = (size: string) => {
    if (!size) return "N/A";
    if (/^[\d,]+$/.test(size)) {
      return parseInt(size.replace(/,/g, "")).toLocaleString() + " employees";
    }
    if (size.toLowerCase().includes("employee")) return size;
    return size + " employees";
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border-0 ring-1 ring-black/5 shadow-xl bg-white/30 dark:bg-black/40 backdrop-blur-xl animate-fade-in transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5">
      {/* Gradient Border Line - Ultra Light Pastel (Static) */}
      <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-indigo-300/10 via-purple-300/10 to-pink-300/10 -z-10 opacity-100" />

      {/* Dynamic Background Glow - Static */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-purple-500/10 opacity-50"></div>

      <div className="relative p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
        {/* Logo */}
        <div className="flex-shrink-0 relative">
          <div className="absolute inset-0 bg-white/50 dark:bg-white/10 blur-xl rounded-full"></div>
          <div className="relative w-24 h-24 md:w-32 md:h-32 bg-white/80 dark:bg-black/50 rounded-2xl flex items-center justify-center overflow-hidden border border-white/20 shadow-inner">
            <img
              src={logoUrl}
              alt={`${company.short_name} logo`}
              className="w-16 h-16 md:w-20 md:h-20 object-contain p-2"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = `<span class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-primary to-purple-600">${company.short_name}</span>`;
              }}
            />
          </div>
        </div>

        {/* Company Info */}
        <div className="flex-1 space-y-4 min-w-0">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                {company.name}
              </h1>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
                  {company.category}
                </Badge>
                <Badge variant="outline" className="border-white/20 bg-white/10 backdrop-blur-md">
                  {company.nature_of_company}
                </Badge>
              </div>
            </div>
            <p className="text-muted-foreground text-lg font-medium">{company.short_name}</p>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm py-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground/80">{company.headquarters_address}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground/80">Founded {company.incorporation_year}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground/80">{formatEmployeeSize(company.employee_size)}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Globe className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground/80">{company.office_count} offices</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
