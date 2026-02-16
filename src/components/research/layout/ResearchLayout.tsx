import { ReactNode } from "react";
import { ResearchSidebar } from "./ResearchSidebar";

interface ResearchLayoutProps {
    children: ReactNode;
    currentView: string;
    onViewChange: (view: string) => void;
}

export const ResearchLayout = ({ children, currentView, onViewChange }: ResearchLayoutProps) => {
    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            <ResearchSidebar currentView={currentView} onViewChange={onViewChange} />
            <main className="flex-1 ml-64 p-8 animate-in fade-in duration-500">
                {children}
            </main>
        </div>
    );
}
