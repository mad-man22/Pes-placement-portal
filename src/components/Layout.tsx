import { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IntelliplaceAssistant } from "@/components/chat/IntelliplaceAssistant";

interface LayoutProps {
    children: ReactNode;
    showBackButton?: boolean;
}

const Layout = ({ children, showBackButton = false }: LayoutProps) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50 flex flex-col">
            {/* Main Content Area - with padding on left for the fixed sidebar */}
            <div className="flex-1 flex">
                <main className="flex-1 container py-6 animate-in fade-in duration-500 ml-[80px] lg:ml-[80px] transition-all">
                    {showBackButton && (
                        <div className="mb-6">
                            <Button
                                variant="ghost"
                                onClick={() => navigate(-1)}
                                className="gap-2 text-slate-500 hover:text-slate-900 -ml-2"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back
                            </Button>
                        </div>
                    )}
                    {children}
                </main>

                {/* Fixed Left Sidebar */}
                <Sidebar />
            </div>
            {/* Footer adjustment */}
            <div className="ml-[80px]">
                <Footer />
            </div>
            <IntelliplaceAssistant />
        </div>
    );
};

export default Layout;
