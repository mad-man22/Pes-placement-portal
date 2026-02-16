import { InnovXProject } from "@/types/innovx";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, Target, Code, Database, Server, Smartphone, ExternalLink, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InnovXProjectsProps {
    projects: InnovXProject[];
}

export const InnovXProjects = ({ projects }: InnovXProjectsProps) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Rocket className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold">InnovX Projects</h2>
                    <p className="text-muted-foreground">Cutting-edge initiatives driving digital transformation.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <Card key={index} className="flex flex-col group hover:shadow-xl transition-all duration-300 border-purple-100 dark:border-purple-900/20">
                        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 w-full" />
                        <CardHeader>
                            <div className="flex justify-between items-start gap-4">
                                <Badge variant="secondary" className="mb-2 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                                    {project.tier_level}
                                </Badge>
                                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                    {project.architecture_style}
                                </span>
                            </div>
                            <CardTitle className="text-xl font-bold group-hover:text-purple-600 transition-colors">
                                {project.project_name}
                            </CardTitle>
                            <CardDescription className="line-clamp-2">
                                {project.problem_statement}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="flex-1 space-y-6">
                            <div className="bg-secondary/20 p-4 rounded-lg space-y-2">
                                <div className="flex items-center gap-2 text-sm font-semibold">
                                    <Target className="w-4 h-4 text-purple-600" />
                                    <span>Goal: {project.innovation_objective}</span>
                                </div>
                                <p className="text-xs text-muted-foreground pl-6">
                                    {project.scenario_description}
                                </p>
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-1.5">
                                    <Code className="w-3.5 h-3.5" /> Tech Stack
                                </h4>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                                    <div className="flex items-center gap-1.5">
                                        <Smartphone className="w-3 h-3 text-muted-foreground" />
                                        <span className="font-medium">FE:</span> {project.frontend_technologies.join(", ")}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Server className="w-3 h-3 text-muted-foreground" />
                                        <span className="font-medium">BE:</span> {project.backend_technologies.join(", ")}
                                    </div>
                                    <div className="flex items-center gap-1.5 col-span-2">
                                        <Zap className="w-3 h-3 text-yellow-500" />
                                        <span className="font-medium">AI:</span> {project.ai_ml_technologies.join(", ")}
                                    </div>
                                    <div className="flex items-center gap-1.5 col-span-2">
                                        <Database className="w-3 h-3 text-blue-500" />
                                        <span className="font-medium">Data:</span> {project.data_storage_processing}
                                    </div>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="pt-4 border-t border-border/50 bg-secondary/5">
                            <div className="w-full flex justify-between items-center text-sm">
                                <span className="font-semibold text-green-600 dark:text-green-400">
                                    {project.business_value}
                                </span>
                                <Button variant="ghost" size="sm" className="h-8 gap-1 text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20">
                                    View Details <ExternalLink className="w-3 h-3" />
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};
