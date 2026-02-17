import { Link, useLocation } from "react-router-dom";
import { Building2, BarChart2, Brain, Briefcase, Zap, GitCompare, LayoutDashboard, LogOut, Code2, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export const MobileNav = () => {
    const location = useLocation();
    const { user, signOut } = useAuth();
    const [open, setOpen] = useState(false);

    const isActive = (path: string) => {
        if (path === '/' && location.pathname === '/') return true;
        if (path !== '/' && location.pathname.startsWith(path)) return true;
        return false;
    };

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/companies', label: 'Companies', icon: Building2 },
        { path: '/compare', label: 'Compare', icon: GitCompare },
        { path: '/skill-fit', label: 'Skill Fit', icon: Brain },
        { path: '/hiring-process', label: 'Hiring', icon: Briefcase },
        { path: '/hiring-skillsets', label: 'Skill Sets', icon: BarChart2 },
        { path: '/practice', label: 'Practice', icon: Code2 },
        { path: '/innovx', label: 'INNOVX', icon: Zap },
    ];

    return (
        <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <Link to="/dashboard" className="flex items-center gap-2">
                <img src="/solologo.png" alt="Intelliplace" className="h-8 w-auto" />
                <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    Intelliplace
                </span>
            </Link>

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0 flex flex-col">
                    <div className="p-6 border-b border-border">
                        <Link to="/dashboard" className="flex items-center gap-3" onClick={() => setOpen(false)}>
                            <img src="/solologo.png" alt="Intelliplace" className="h-10 w-auto" />
                            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                                Intelliplace
                            </span>
                        </Link>
                    </div>

                    <nav className="flex-1 overflow-auto py-6 px-4 flex flex-col gap-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
                                    isActive(item.path)
                                        ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-slate-200"
                                )}
                            >
                                <item.icon className={cn("h-5 w-5", isActive(item.path) ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400")} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        ))}
                    </nav>

                    <div className="p-4 border-t border-border mt-auto">
                        <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-white/5">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 shrink-0 flex items-center justify-center text-white text-sm font-bold overflow-hidden">
                                {user?.user_metadata?.avatar_url ? (
                                    <img
                                        src={user.user_metadata.avatar_url}
                                        alt="User"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    user?.email?.charAt(0).toUpperCase() || 'U'
                                )}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-semibold truncate text-foreground">{user?.email || 'User'}</p>
                                <Button
                                    variant="link"
                                    className="p-0 h-auto text-xs text-muted-foreground hover:text-destructive"
                                    onClick={() => {
                                        setOpen(false);
                                        signOut();
                                    }}
                                >
                                    Sign Out
                                </Button>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};
