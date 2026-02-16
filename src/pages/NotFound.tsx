import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden text-center selection:bg-primary/20">
      {/* Background Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-background to-background opacity-70"></div>

      <div className="relative z-10 space-y-8 max-w-lg mx-auto">
        <div className="bg-white/40 dark:bg-black/20 backdrop-blur-xl p-10 rounded-3xl border border-white/20 shadow-2xl animate-fade-in-up">
          <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600 mb-4 drop-shadow-sm">404</h1>
          <h2 className="text-3xl font-bold text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground mt-4 mb-8 text-lg">
            Oops! The page you're looking for seems to have wandered off into the void.
          </p>
          <Button asChild className="rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-primary/25 transition-all w-full sm:w-auto">
            <Link to="/">Return to Safety</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
