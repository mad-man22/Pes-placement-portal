import { LayoutDashboard, Building2, Brain, GitBranch, Lightbulb } from "lucide-react";

interface ResearchSidebarProps {
    currentView: string;
    onViewChange: (view: string) => void;
}

const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "companies", label: "Companies", icon: Building2 },
    { id: "hiring-skills", label: "Hiring Skill Set", icon: Brain },
    { id: "hiring-process", label: "Hiring Process", icon: GitBranch },
    { id: "innovx", label: "INNOVX", icon: Lightbulb },
];

export const ResearchSidebar = ({ currentView, onViewChange }: ResearchSidebarProps) => {
    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-slate-900 text-white flex flex-col border-r border-slate-800">
            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-800">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
                    P
                </div>
                <div>
                    <h1 className="font-bold text-lg">PES</h1>
                    <p className="text-xs text-slate-400">Placements & Research</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1">
                {navItems.map((item) => {
                    // Simplistic active check: "innovx" view might be "innovx-detail" etc.
                    const isActive = currentView === item.id || (item.id !== 'dashboard' && currentView.startsWith(item.id));

                    return (
                        <button
                            key={item.id}
                            onClick={() => onViewChange(item.id)}
                            className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${isActive
                                    ? "bg-blue-600/20 text-blue-400"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                }`}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </button>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-800">
                <p className="text-xs text-slate-500">© 2025 PES University</p>
            </div>
        </aside>
    );
}
