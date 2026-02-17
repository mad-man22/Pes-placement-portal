import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
    return (
        <footer className="relative mt-20 border-t border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-xl">
            {/* Gradient Top Border */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

            <div className="container px-4 md:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-2 space-y-4">
                        <Link to="/dashboard" className="flex items-center gap-2">
                            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-8 h-8 rounded-lg flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-lg">I</span>
                            </div>
                            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                                Intelliplace
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                            The intelligent playground for campus placements. Empowering students with data-driven insights to make informed career decisions.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-sm tracking-wide text-foreground">Platform</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link to="/companies" className="hover:text-primary transition-colors">Browse Companies</Link>
                            </li>
                            <li>
                                <Link to="/compare" className="hover:text-primary transition-colors">Compare Companies</Link>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition-colors">Placement Trends</a>
                            </li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-sm tracking-wide text-foreground">Connect</h4>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[#0077b5]">
                                <Linkedin className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[#1DA1F2]">
                                <Twitter className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-foreground">
                                <Github className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                    <p>© 2025 Intelliplace. All rights reserved.</p>
                    <div className="flex items-center gap-1">
                        <span>Made with</span>
                        <Heart className="h-3 w-3 text-red-500 fill-red-500 animate-pulse" />
                        <span>for Talentia Internship</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
