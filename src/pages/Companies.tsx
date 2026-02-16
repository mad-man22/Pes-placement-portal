import { useState } from "react";
import { CompanyCard } from "@/components/company/CompanyCard";
import { FilterSidebar } from "@/components/company/FilterSidebar";
import { useCompanies } from "@/hooks/useCompanies";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter, Search } from "lucide-react";
import { IntelliplaceAssistant } from "@/components/chat/IntelliplaceAssistant";
import Layout from "@/components/Layout";

const Companies = () => {
  const { companies, loading, error } = useCompanies();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter States
  const CATEGORY_OPTIONS = [
    "Public", "Private", "Startup", "Scale-up", "Enterprise",
    "Subsidiary", "SMB", "Mature", "Large", "Global", "Multinational"
  ];

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [countrySearchTerm, setCountrySearchTerm] = useState("");

  const [showFilters, setShowFilters] = useState(false);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setCountrySearchTerm("");
  };

  const filteredCompanies = companies.filter((company) => {
    // 1. Search Filter
    const matchesSearch = !searchTerm || (
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.short_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.headquarters_address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 2. Category Filter
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.some(cat => {
      const lowerCat = cat.toLowerCase();
      // Safe access helper
      const category = company.category?.toLowerCase() || "";
      const nature = company.nature_of_company?.toLowerCase() || "";
      const maturity = company.talent_growth?.[0]?.company_maturity?.toLowerCase() || "";
      const overview = company.overview_text?.toLowerCase() || "";

      return (
        category === lowerCat ||
        nature === lowerCat ||
        maturity.includes(lowerCat) ||
        // For Global/Multinational, check overview if not explicitly in fields
        ((lowerCat === "global" || lowerCat === "multinational") && overview.includes(lowerCat))
      );
    });

    // 5. Country Filter (Fuzzy match in Operating Countries or Headquarters)
    const matchesCountry = !countrySearchTerm || (
      (company.operating_countries?.some(c => c.country_name?.toLowerCase().includes(countrySearchTerm.toLowerCase())) ?? false) ||
      (company.headquarters_address?.toLowerCase().includes(countrySearchTerm.toLowerCase()) ?? false)
    );

    return matchesSearch && matchesCategory && matchesCountry;
  });

  if (loading) {
    return (
      <Layout>
        <div className="flex h-64 items-center justify-center">
          <p>Loading companies...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex h-64 items-center justify-center">
          <p className="text-destructive">Error: {error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          {/* Hero Section */}
          <div className="relative mb-12 rounded-3xl overflow-hidden bg-gradient-to-br from-primary/90 via-indigo-600 to-purple-700 shadow-2xl animate-fade-in">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 mix-blend-overlay"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

            <div className="relative z-10 px-8 py-16 md:py-24 text-center">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 drop-shadow-sm">
                Discover Your Future at <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-pink-200">Intelliplace</span>
              </h1>
              <p className="text-blue-100 text-xl font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
                The intelligent playground for campus placements. Explore
                <span className="font-bold text-white mx-1.5 px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-sm border border-white/30">
                  {filteredCompanies.length}
                </span>
                top-tier companies visiting your campus.
              </p>

              <div className="max-w-xl mx-auto relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-11 pr-4 py-4 border-0 rounded-full leading-5 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 sm:text-sm shadow-xl transition-all"
                    placeholder="Search companies, roles, locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Area - Desktop */}
          <div className={`hidden md:flex flex-col transition-all duration-300 ${showFilters ? 'w-[280px]' : 'w-[40px] items-center'}`}>

            {/* Toggle Tag/Button */}
            <Button
              variant={showFilters ? "secondary" : "default"}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className={`mb-4 w-full ${!showFilters ? 'h-32 py-4 px-2' : ''}`}
              style={!showFilters ? { writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' } : undefined}
            >
              <Filter className={`h-4 w-4 ${showFilters ? 'mr-2' : 'mb-2'}`} />
              {showFilters ? "Hide Filters" : "Filters"}
            </Button>

            {/* Filter Content */}
            {showFilters && (
              <FilterSidebar
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
                availableCategories={CATEGORY_OPTIONS}
                countrySearchTerm={countrySearchTerm}
                onCountrySearchChange={setCountrySearchTerm}
                onClearFilters={clearFilters}
              />
            )}
          </div>

          {/* Sidebar - Mobile (Sheet) */}
          <div className="md:hidden mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters {selectedCategories.length > 0 && `(${selectedCategories.length})`}
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="pt-4 h-full">
                  <FilterSidebar
                    selectedCategories={selectedCategories}
                    onCategoryChange={handleCategoryChange}
                    availableCategories={CATEGORY_OPTIONS}
                    countrySearchTerm={countrySearchTerm}
                    onCountrySearchChange={setCountrySearchTerm}
                    onClearFilters={clearFilters}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Company Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompanies.map((company, index) => (
                <CompanyCard key={company.short_name || index} company={company} />
              ))}
            </div>

            {/* Empty State */}
            {filteredCompanies.length === 0 && (
              <div className="text-center py-12 border rounded-lg border-dashed">
                <p className="text-muted-foreground">No companies found matching your criteria.</p>
                <Button variant="link" onClick={() => { setSearchTerm(""); clearFilters(); }}>
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default Companies;
