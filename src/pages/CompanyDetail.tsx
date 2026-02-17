import { useParams, Navigate } from "react-router-dom";
import { CompanyHeader } from "@/components/company/CompanyHeader";
import { StatsCards } from "@/components/company/StatsCards";
import { CompanyTabs } from "@/components/company/CompanyTabs";
import { useCompany } from "@/hooks/useCompany";
import Layout from "@/components/Layout";

const CompanyDetail = () => {
  const { shortName } = useParams<{ shortName: string }>();
  // const company = shortName ? getCompanyByShortName(shortName) : undefined;
  const { company, loading, error } = useCompany(shortName);

  // If loading
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading details...</p>
      </div>
    )
  }

  // If error or not found (and not loading)
  if (!company || error) {
    if (error) console.error(error);
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Layout showBackButton={true}>
      <div className="min-h-screen bg-transparent relative selection:bg-primary/20">
        {/* Global Background Mesh - kept for visual consistency within the layout */}
        <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent opacity-50"></div>
        <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-50"></div>

        <div className="relative z-10 space-y-6">
          {/* Company Header */}
          <CompanyHeader company={company} />

          {/* Quick Stats */}
          <StatsCards company={company} />

          {/* Detailed Information Tabs */}
          <CompanyTabs company={company} />
        </div>
      </div>
    </Layout>
  );
};

export default CompanyDetail;
