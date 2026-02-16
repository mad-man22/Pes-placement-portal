import { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface DetailHeaderStat {
    label: string;
    value: string | number;
    icon: LucideIcon;
    color?: string; // e.g. "text-primary"
}

export interface DetailHeaderProps {
    title: string;
    subtitle: string;
    logoUrl?: string; // Optional, falls back to text
    tags?: string[];
    stats?: DetailHeaderStat[];
    gradient?: string; // e.g. "from-blue-500/10"
}

export const DetailHeader = ({
    title,
    subtitle,
    logoUrl,
    tags = [],
    stats = [],
    gradient = "from-primary/10"
}: DetailHeaderProps) => {

    return (
        <div className="relative rounded-2xl overflow-hidden border-0 ring-1 ring-black/5 shadow-xl bg-white/30 dark:bg-black/40 backdrop-blur-xl animate-fade-in transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5 mb-8">
            {/* Gradient Border Line */}
            <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-indigo-300/10 via-purple-300/10 to-pink-300/10 -z-10 opacity-100" />

            {/* Dynamic Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-r ${gradient} via-transparent to-transparent opacity-50`}></div>

            <div className="relative p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                {/* Logo */}
                <div className="flex-shrink-0 relative">
                    <div className="absolute inset-0 bg-white/50 dark:bg-white/10 blur-xl rounded-full"></div>
                    <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white/80 dark:bg-black/50 rounded-2xl flex items-center justify-center overflow-hidden border border-white/20 shadow-inner">
                        {logoUrl ? (
                            <img
                                src={logoUrl}
                                alt={`${title} logo`}
                                className="w-14 h-14 md:w-16 md:h-16 object-contain p-2"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement!.innerHTML = `<span class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-primary to-purple-600">${title.substring(0, 2).toUpperCase()}</span>`;
                                }}
                            />
                        ) : (
                            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-primary to-purple-600">{title.substring(0, 2).toUpperCase()}</span>
                        )}
                    </div>
                </div>

                {/* Info */}
                <div className="flex-1 space-y-4 min-w-0">
                    <div>
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
                                {title}
                            </h1>
                            {tags.length > 0 && (
                                <div className="flex items-center gap-2">
                                    {tags.map(tag => (
                                        <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>
                        <p className="text-muted-foreground text-lg font-medium">{subtitle}</p>
                    </div>

                    {/* Stats Grid */}
                    {stats.length > 0 && (
                        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm py-4 border-t border-white/10 mt-auto">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-muted-foreground">
                                    <stat.icon className={`h-4 w-4 ${stat.color || "text-primary"}`} />
                                    <span className="font-medium text-foreground/80">{stat.value} <span className="text-slate-400 font-normal ml-1">{stat.label}</span></span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
