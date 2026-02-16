import { useState, useEffect } from "react";
import { Building2, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  showBackButton?: boolean;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
}

export const Header = ({ showBackButton = false, searchTerm, onSearchChange }: HeaderProps) => {
  const location = useLocation();
  // Local state to handle typing if controlled prop isn't provided or to debounce
  const [localSearch, setLocalSearch] = useState(searchTerm || "");

  useEffect(() => {
    if (searchTerm !== undefined) {
      setLocalSearch(searchTerm);
    }
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);
    onSearchChange?.(value);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/80 dark:bg-black/20 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.location.href = "/"}>
          {showBackButton && (
            <Link to="/">
              <Button variant="ghost" size="icon" className="mr-1 hover:bg-white/20">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
          )}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 text-white shadow-lg transition-transform group-hover:scale-110 duration-300">
              <Building2 className="h-6 w-6" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-pink-600">Intelliplace</h1>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Campus Intelligence</p>
            </div>
          </Link>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md mx-4 hidden md:block group">
          <div className="relative transition-all duration-300 focus-within:scale-105">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Search companies, sectors, roles..."
              className="pl-9 bg-secondary/50 border-gray-200/50 focus:border-primary/50 focus:ring-primary/20 backdrop-blur-sm rounded-full shadow-inner hover:shadow-md transition-all duration-300"
              value={localSearch}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {['/', '/compare', '/skill-fit', '/hiring-process', '/hiring-skillsets', '/innovx'].map((path) => {
            const labels: Record<string, string> = {
              '/': 'Companies',
              '/compare': 'Compare',
              '/skill-fit': 'Skill Fit',
              '/hiring-process': 'Hiring',
              '/hiring-skillsets': 'Skill Sets',
              '/innovx': 'INNOVX'
            };
            const active = isActive(path);

            return (
              <Link to={path} key={path}>
                <div className="relative px-3 py-2 rounded-full transition-all duration-300 hover:bg-secondary/80 group">
                  <span className={`text-sm font-medium transition-colors ${active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}>
                    {labels[path]}
                  </span>
                  {active && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-4 bg-primary rounded-full animate-fade-in" />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
};
