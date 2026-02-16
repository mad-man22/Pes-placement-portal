import { Competitor } from "@/types/innovx";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Swords, ShieldAlert, Target } from "lucide-react";

interface CompetitiveLandscapeProps {
    competitors: Competitor[];
}

export const CompetitiveLandscape = ({ competitors }: CompetitiveLandscapeProps) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-500/10 rounded-lg">
                    <Swords className="w-6 h-6 text-red-500" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Competitive Landscape</h2>
                    <p className="text-muted-foreground">Key rivals and strategic threats.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {competitors.map((competitor, index) => (
                    <Card key={index} className="overflow-hidden border-t-4 border-t-destructive/50 hover:border-t-destructive transition-all">
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <Badge variant="outline" className="mb-2 uppercase tracking-wide text-[10px] font-bold">
                                        {competitor.competitor_type}
                                    </Badge>
                                    <CardTitle className="text-xl font-bold">{competitor.competitor_name}</CardTitle>
                                    <div className="text-sm text-muted-foreground mt-1">{competitor.market_positioning}</div>
                                </div>
                                <ShieldAlert className={`w-5 h-5 ${competitor.threat_level === 'High' ? 'text-destructive' : 'text-orange-500'}`} />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="font-semibold block text-muted-foreground text-xs uppercase">Core Strength</span>
                                    <span>{competitor.core_strength}</span>
                                </div>
                                <div>
                                    <span className="font-semibold block text-muted-foreground text-xs uppercase">Strategic Objective</span>
                                    <span>{competitor.strategic_objective}</span>
                                </div>
                            </div>

                            <div className="bg-secondary/30 p-3 rounded-lg border border-secondary">
                                <div className="flex items-center gap-2 mb-1">
                                    <Target className="w-4 h-4 text-primary" />
                                    <span className="font-semibold text-sm">Key Bet: {competitor.bet_name}</span>
                                </div>
                                <p className="text-xs text-muted-foreground ml-6">
                                    {competitor.bet_description}
                                </p>
                            </div>

                            <div className="flex items-center justify-between text-xs pt-2 border-t border-border/50">
                                <span className="text-muted-foreground">Innovation: <span className="font-medium text-foreground">{competitor.innovation_category}</span></span>
                                <Badge variant="secondary" className="text-[10px]">{competitor.futuristic_level}</Badge>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};
