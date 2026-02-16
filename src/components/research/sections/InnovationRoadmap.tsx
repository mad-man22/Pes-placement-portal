import { InnovationRoadmapItem } from "@/types/innovx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Map, Target, Lightbulb, ArrowRight, Layers } from "lucide-react";

interface InnovationRoadmapProps {
    roadmap: InnovationRoadmapItem[];
}

export const InnovationRoadmap = ({ roadmap }: InnovationRoadmapProps) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                    <Map className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Innovation Roadmap</h2>
                    <p className="text-muted-foreground">Strategic initiatives and future capabilities.</p>
                </div>
            </div>

            <div className="space-y-4">
                {roadmap.map((item, index) => (
                    <Card key={index} className="overflow-hidden border-l-4 border-l-primary/70 hover:border-l-primary transition-all">
                        <CardContent className="p-6">
                            <div className="grid md:grid-cols-3 gap-6">
                                {/* Left: Core Info */}
                                <div className="md:col-span-1 space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                                            {item.time_horizon}
                                        </Badge>
                                        <Badge variant="secondary">{item.innovation_type}</Badge>
                                    </div>
                                    <h3 className="text-lg font-bold">{item.innovation_theme}</h3>
                                    <div className="text-sm text-muted-foreground">
                                        <span className="font-semibold text-foreground">Target:</span> {item.target_customer}
                                    </div>
                                </div>

                                {/* Middle: Problem & Solution */}
                                <div className="md:col-span-2 space-y-4">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase">
                                                <Target className="w-3.5 h-3.5" /> Problem
                                            </div>
                                            <p className="text-sm border-l-2 border-destructive/30 pl-3">
                                                {item.problem_statement}
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase">
                                                <Lightbulb className="w-3.5 h-3.5" /> Outcome
                                            </div>
                                            <p className="text-sm border-l-2 border-green-500/30 pl-3">
                                                {item.expected_outcome}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Layers className="w-4 h-4 text-muted-foreground" />
                                            <span className="font-medium">Capabilities:</span>
                                            <span className="text-muted-foreground">{item.required_capabilities.join(", ")}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                                            <span className="font-medium">Driven By:</span>
                                            <span className="text-muted-foreground">{item.dependent_trend_names.join(", ")}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};
