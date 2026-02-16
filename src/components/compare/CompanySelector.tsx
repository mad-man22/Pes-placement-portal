import { useState } from "react";
import { Check, ChevronsUpDown, X, Search, Building2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useCompanies } from "@/hooks/useCompanies";
import { Badge } from "@/components/ui/badge";

interface CompanySelectorProps {
    selectedShortNames: string[];
    onSelect: (shortName: string) => void;
    onRemove: (shortName: string) => void;
}

export const CompanySelector = ({
    selectedShortNames,
    onSelect,
    onRemove,
}: CompanySelectorProps) => {
    const [open, setOpen] = useState(false);
    const { companies, loading } = useCompanies();

    // Filter out companies that are already selected
    const availableCompanies = companies.filter(
        (c) => !selectedShortNames.includes(c.short_name)
    );

    return (
        <div className="w-full space-y-4">
            <label className="text-sm font-medium text-muted-foreground ml-1">
                Select Companies to Compare (Max 3)
            </label>

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <div
                        role="combobox"
                        aria-expanded={open}
                        className="relative min-h-[60px] w-full flex flex-wrap items-center gap-2 p-3 rounded-xl bg-white/40 dark:bg-black/20 backdrop-blur-xl shadow-inner transition-all cursor-pointer ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 border-0 ring-1 ring-black/5"
                        onClick={() => setOpen(true)}
                    >
                        {/* Gradient Border Line - Ultra Light Pastel (Static) */}
                        <div className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-br from-indigo-300/10 via-purple-300/10 to-pink-300/10 -z-10 opacity-100" />
                        {selectedShortNames.length === 0 && (
                            <div className="flex items-center text-muted-foreground px-2">
                                <Search className="w-4 h-4 mr-2 opacity-50" />
                                <span className="text-sm">Search companies...</span>
                            </div>
                        )}

                        {selectedShortNames.map((shortName) => (
                            <Badge
                                key={shortName}
                                variant="secondary"
                                className="pl-3 pr-1 py-1.5 h-8 text-sm bg-white/80 dark:bg-white/10 hover:bg-white/90 shadow-sm border-white/20 animate-in fade-in zoom-in duration-300"
                            >
                                <Building2 className="w-3 h-3 mr-1.5 text-primary opacity-70" />
                                {shortName.toUpperCase()}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="ml-1.5 h-6 w-6 rounded-full hover:bg-red-500/20 hover:text-red-500 p-0"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onRemove(shortName);
                                    }}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </Badge>
                        ))}

                        {selectedShortNames.length < 3 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 rounded-full text-muted-foreground/80 hover:text-primary hover:bg-primary/10 ml-auto"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Company
                            </Button>
                        )}
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 border-white/20 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl shadow-2xl rounded-xl overflow-hidden" align="start">
                    <Command className="bg-transparent">
                        <CommandInput placeholder="Type to search..." className="border-none focus:ring-0 h-12 text-base bg-transparent" />
                        <CommandList className="max-h-[300px] p-2">
                            <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">No company found.</CommandEmpty>
                            <CommandGroup heading="Available Companies" className="text-xs font-semibold text-muted-foreground/70">
                                {loading && <CommandItem disabled>Loading...</CommandItem>}
                                {!loading && availableCompanies.map((company) => {
                                    const logoUrl = company.logos?.[0]?.logo_url;
                                    return (
                                        <CommandItem
                                            key={company.short_name}
                                            value={company.name}
                                            onSelect={() => {
                                                onSelect(company.short_name);
                                                setOpen(false);
                                            }}
                                            className="flex items-center gap-3 px-4 py-3 mb-1 rounded-lg aria-selected:bg-primary/10 aria-selected:text-primary cursor-pointer transition-colors"
                                        >
                                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-primary border shadow-sm">
                                                {logoUrl ? (
                                                    <img src={logoUrl} alt={company.short_name} className="h-5 w-5 object-contain" />
                                                ) : (
                                                    <Building2 className="h-4 w-4" />
                                                )}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-sm">{company.name}</span>
                                                <span className="text-xs text-muted-foreground uppercase">{company.category}</span>
                                            </div>
                                            <Check
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    selectedShortNames.includes(company.short_name)
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};
