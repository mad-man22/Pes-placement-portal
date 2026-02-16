import { StrategicPillar } from "@/types/innovx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Landmark, Eye, CheckCircle2, ShieldCheck } from "lucide-react";

interface StrategicPillarsProps {
    pillars: StrategicPillar[];
}

export const StrategicPillars = ({ pillars }: StrategicPillarsProps) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-500/10 rounded-lg">
                    <Landmark className="w-6 h-6 text-indigo-500" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Strategic Pillars</h2>
                    <p className="text-muted-foreground">Core vision and long-term objectives.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {pillars.map((pillar, index) => (
                    <Card key={index} className="flex flex-col h-full bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black border-indigo-100 dark:border-indigo-900/30">
                        <CardHeader className="pb-3">
                            <div className="mb-2">
                                <Badge variant="outline" className="text-xs font-normal border-indigo-200 text-indigo-700 dark:border-indigo-800 dark:text-indigo-300">
                                    {pillar.focus_area}
                                </Badge>
                            </div>
                            <CardTitle className="text-lg font-bold leading-tight">{pillar.pillar_name}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-4 flex flex-col">
                            <p className="text-sm text-muted-foreground flex-1">
                                {pillar.pillar_description}
                            </p>

                            <div className="bg-indigo-50/50 dark:bg-indigo-900/10 p-3 rounded-lg border border-indigo-100 dark:border-indigo-800/20">
                                <div className="flex items-start gap-2">
                                    <Eye className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                                    <p className="text-xs font-medium italic text-indigo-900 dark:text-indigo-100">
                                        "{pillar.cto_vision_statement}"
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2 pt-2 border-t border-border/50">
                                <div className="text-xs font-semibold uppercase text-muted-foreground flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3" /> Tech Stack
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {pillar.key_technologies.map((tech, idx) => (
                                        <span key={idx} className="text-xs px-2 py-0.5 bg-secondary rounded-md border border-secondary-foreground/10">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-2 text-xs text-muted-foreground flex items-center gap-1.5">
                                <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                                <span className="truncate" title={pillar.strategic_assumptions}>
                                    {pillar.strategic_assumptions}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};
