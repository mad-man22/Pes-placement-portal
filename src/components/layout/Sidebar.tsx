import { Link, useLocation } from "react-router-dom";
import { Building2, BarChart2, Brain, Briefcase, Zap, GitCompare, LayoutDashboard, LogOut, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export const Sidebar = () => {
    const location = useLocation();
    const { user, signOut } = useAuth();

    const isActive = (path: string) => {
        if (path === '/' && location.pathname === '/') return true;
        if (path !== '/' && location.pathname.startsWith(path)) return true;
        return false;
    };

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/companies', label: 'Companies', icon: Building2 }, // Fixed path
        { path: '/compare', label: 'Compare', icon: GitCompare },
        { path: '/skill-fit', label: 'Skill Fit', icon: Brain },
        { path: '/hiring-process', label: 'Hiring', icon: Briefcase },
        { path: '/hiring-skillsets', label: 'Skill Sets', icon: BarChart2 },
        { path: '/practice', label: 'Practice', icon: Code2 },
        { path: '/innovx', label: 'INNOVX', icon: Zap },
    ];

    return (
        <aside className="hidden md:flex w-[80px] hover:w-64 transition-all duration-300 ease-in-out bg-white/80 dark:bg-black/80 backdrop-blur-md border-r border-white/20 h-screen fixed left-0 top-0 z-50 flex-col shadow-2xl group overflow-hidden">
            <Link to="/dashboard" className="h-20 flex items-center px-4 gap-3 border-b border-white/10 transition-all overflow-hidden whitespace-nowrap hover:bg-slate-50/5 dark:hover:bg-white/5">
                <img src="/solologo.png" alt="Intelliplace" className="h-10 w-auto shrink-0" />
                <span className="font-bold text-xl tracking-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 delay-100">
                    Intelliplace
                </span>
            </Link>

            <nav className="flex-1 py-8 flex flex-col gap-2 px-3">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={cn(
                            "flex items-center p-3 rounded-xl transition-all duration-200 group/item relative",
                            isActive(item.path)
                                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 shadow-sm"
                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-slate-200"
                        )}
                    >
                        <item.icon className={cn("h-6 w-6 shrink-0 transition-colors", isActive(item.path) ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 group-hover/item:text-slate-600")} />

                        <span className="ml-4 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap absolute left-12 top-1/2 -translate-y-1/2">
                            {item.label}
                        </span>

                        {/* Tooltip for collapsed state */}
                        <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-0 pointer-events-none transition-opacity z-50 whitespace-nowrap hidden group-hover/item:block lg:group-hover:hidden">
                            {item.label}
                        </div>

                        {isActive(item.path) && (
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-600 rounded-l-full" />
                        )}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-white/10">
                <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-white/5 transition-all duration-300">
                    <Link to="/profile" className="flex items-center gap-3 flex-1 min-w-0 group/profile">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 shrink-0 flex items-center justify-center text-white text-xs font-bold overflow-hidden">
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
                        <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-1">
                            <p className="text-sm font-semibold truncate group-hover/profile:text-indigo-600 dark:group-hover/profile:text-indigo-400 transition-colors">{user?.email || 'User'}</p>
                            <p className="text-xs text-slate-500 truncate">View Profile</p>
                        </div>
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => signOut()} // Logout trigger
                        className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-destructive/10 hover:text-destructive shrink-0"
                        title="Sign Out"
                    >
                        <LogOut className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </aside>
    );
};
