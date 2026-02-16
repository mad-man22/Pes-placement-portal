import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator"; // Assuming you have this or use hr

interface FilterSidebarProps {
    // Category Filter
    selectedCategories: string[];
    onCategoryChange: (category: string) => void;
    availableCategories: string[];

    // Location Filter
    countrySearchTerm: string;
    onCountrySearchChange: (value: string) => void;

    onClearFilters: () => void;
}

export const FilterSidebar = ({
    selectedCategories,
    onCategoryChange,
    availableCategories,
    countrySearchTerm,
    onCountrySearchChange,
    onClearFilters,
}: FilterSidebarProps) => {

    return (
        <div className="space-y-6 bg-white/40 dark:bg-black/20 border border-white/20 backdrop-blur-md rounded-2xl p-6 shadow-sm h-[calc(100vh-120px)] overflow-hidden flex flex-col">
            <div className="flex-shrink-0">
                <h3 className="text-lg font-bold mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="p-1.5 bg-primary/10 rounded-md text-primary">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                        </span>
                        Filters
                    </div>
                    {(selectedCategories.length > 0 || countrySearchTerm) && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={onClearFilters}
                        >
                            Clear
                        </Button>
                    )}
                </h3>
            </div>

            <ScrollArea className="flex-1 -mx-4 px-4">
                <div className="space-y-6 pb-6">
                    {/* Category Filter */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                            Categories
                        </h4>
                        <div className="space-y-2">
                            {availableCategories.map((category) => (
                                <div key={category} className="flex items-center space-x-3 group">
                                    <Checkbox
                                        id={`category-${category}`}
                                        checked={selectedCategories.includes(category)}
                                        onCheckedChange={() => onCategoryChange(category)}
                                        className="transition-all data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground border-primary/50"
                                    />
                                    <Label
                                        htmlFor={`category-${category}`}
                                        className="text-sm font-medium cursor-pointer group-hover:text-primary transition-colors leading-none"
                                    >
                                        {category}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Separator className="bg-border/50" />

                    {/* Location Filter */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                            Location
                        </h4>
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Search by country or city..."
                                value={countrySearchTerm}
                                onChange={(e) => onCountrySearchChange(e.target.value)}
                                className="h-9 bg-white/50 dark:bg-black/50 border-white/20 focus:border-primary/50 text-sm placeholder:text-muted-foreground/50 transition-all"
                            />
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
};
