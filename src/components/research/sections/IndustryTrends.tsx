import { IndustryTrend } from "@/types/innovx";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertTriangle, Zap, Clock } from "lucide-react";

interface IndustryTrendsProps {
    trends: IndustryTrend[];
}

export const IndustryTrends = ({ trends }: IndustryTrendsProps) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Industry Trends</h2>
                    <p className="text-muted-foreground">Key market shifts focusing on AI, Cloud, and Automation.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trends.map((trend, index) => (
                    <Card key={index} className="bg-white/50 dark:bg-black/20 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all duration-300 group">
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-start gap-4">
                                <CardTitle className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
                                    {trend.trend_name}
                                </CardTitle>
                                <Badge variant={trend.strategic_importance === 'Critical' ? 'destructive' : 'default'} className="shrink-0">
                                    {trend.strategic_importance}
                                </Badge>
                            </div>
                            <CardDescription className="line-clamp-3 mt-2">
                                {trend.trend_description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                <span>Time Horizon: <span className="font-medium text-foreground">{trend.time_horizon_years} Years</span></span>
                            </div>

                            <div className="space-y-2">
                                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                                    <Zap className="w-3.5 h-3.5" /> Drivers
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {trend.trend_drivers.map((driver, idx) => (
                                        <Badge key={idx} variant="secondary" className="text-xs bg-secondary/50">
                                            {driver}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                                    <AlertTriangle className="w-3.5 h-3.5" /> Impact Areas
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {trend.impact_areas.map((area, idx) => (
                                        <Badge key={idx} variant="outline" className="text-xs">
                                            {area}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};
