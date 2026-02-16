import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, X, MessageSquare, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Define message type
interface Message {
    role: "user" | "model";
    text: string;
}

export function IntelliplaceAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [showGreeting, setShowGreeting] = useState(false);
    const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Show greeting after small delay on load, then hide it
    useEffect(() => {
        const showTimer = setTimeout(() => {
            setShowGreeting(true);
            // Hide after 8s if not hovered
            hideTimerRef.current = setTimeout(() => setShowGreeting(false), 8000);
        }, 1500);

        return () => {
            clearTimeout(showTimer);
            if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        };
    }, []);

    const handleMouseEnter = () => {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        setShowGreeting(true);
    };

    const handleMouseLeave = () => {
        setShowGreeting(false);
    };

    const [messages, setMessages] = useState<Message[]>([
        { role: "model", text: "Hi! I'm Intelliplace Assistant. Ask me anything about companies, placements, or career tips!" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Initialize Gemini API
    // NOTE: This assumes VITE_GEMINI_API_KEY is set in .env
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey || "");

    useEffect(() => {
        // Scroll to bottom when messages change
        if (scrollAreaRef.current) {
            const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            }
        }

        // Auto-focus input when opened
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        if (!apiKey) {
            toast.error("Gemini API Key is missing. Please check your configuration.");
            setMessages(prev => [...prev, { role: "model", text: "I'm sorry, I cannot process your request right now because my brain (API Key) is missing." }]);
            return;
        }

        const userMessage = input.trim();
        setInput("");
        setMessages(prev => [...prev, { role: "user", text: userMessage }]);
        setIsLoading(true);

        try {
            // Debugging: Check if API key is present
            if (!apiKey) {
                console.error("Gemini API Key is missing");
                throw new Error("Missing API Key");
            }
            console.log("Using Gemini API with key:", apiKey.substring(0, 5) + "...");

            // Use gemini-1.5-flash as it is the current valid model name for Flash
            const model = genAI.getGenerativeModel({
                model: "gemini-flash-latest",
                systemInstruction: "You are Intelliplace Assistant, a dedicated AI for campus placements and career guidance. \n" +
                    "Your role is to help students with specific questions about companies, interview preparation, resume tips, and placement processes.\n" +
                    "STRICTLY REFUSE to answer questions unrelated to career, placements, technology, or professional development. \n" +
                    "SPECIFICALLY FORBIDDEN: Do not answer questions about movies, TV shows, music, sports, or entertainment, EVEN IF asked in the context of motivation or partial career relevance. \n" +
                    "If asked 'which movie to watch for engineering motivation', REFUSE. \n" +
                    "If asked about general topics, politely reply: 'I am designed to assist only with placement and professional career queries.'\n" +
                    "Keep answers professional, encouraging, and concise."
            });

            // Construct history for context
            // Gemini requires history to start with 'user' role.
            // We filter out the first message (our Greeting) if it's from 'model'.
            const historyMessages = messages.filter((msg, index) => {
                // Always skip the very first message if it's the default greeting (index 0 and role model)
                if (index === 0 && msg.role === "model") return false;
                return true;
            });

            const history = historyMessages.map(msg => ({
                role: msg.role,
                parts: [{ text: msg.text }]
            }));

            const chat = model.startChat({
                history: history,
                generationConfig: {
                    maxOutputTokens: 500,
                },
            });

            const result = await chat.sendMessage(userMessage);
            const response = await result.response;
            const text = response.text();

            setMessages(prev => [...prev, { role: "model", text: text }]);
        } catch (error: any) {
            console.error("Error calling Gemini API:", error);

            let errorMessage = "I'm having trouble connecting right now. Please try again later.";
            if (error.message?.includes("API key")) {
                errorMessage = "Invalid or missing API Key. Please check your configuration.";
            } else if (error.message?.includes("fetch failed")) {
                errorMessage = "Network connection failed. Please check your internet connection.";
            } else if (error.message?.includes("404") || error.message?.includes("not found")) {
                errorMessage = "Model not found. Please check the model version.";
            }

            toast.error("Failed to get response from Intelliplace Assistant.");

            // Revert to user-friendly message, but log the detail
            console.error("Detailed API Error:", error);
            setMessages(prev => [...prev, { role: "model", text: errorMessage }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 font-sans">
            {/* Chat Window */}
            <div
                className={cn(
                    "transition-all duration-300 ease-in-out transform origin-bottom-right",
                    isOpen
                        ? "scale-100 opacity-100 translate-y-0"
                        : "scale-95 opacity-0 translate-y-4 pointer-events-none absolute bottom-16 right-0"
                )}
            >
                <Card className="w-[350px] md:w-[400px] h-[500px] shadow-2xl border-indigo-100 dark:border-indigo-900 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md overflow-hidden flex flex-col">
                    {/* Header */}
                    <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 shrink-0 flex flex-row items-center justify-between space-y-0">
                        <div className="flex items-center gap-2 text-white">
                            <div className="bg-white/20 p-2 rounded-full ring-2 ring-white/30">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <div>
                                <CardTitle className="text-lg font-bold">Intelliplace Assistant</CardTitle>
                                <p className="text-xs text-indigo-100 opacity-90">Powered by Gemini AI</p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/20 rounded-full h-8 w-8"
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </CardHeader>

                    {/* Messages Area */}
                    <CardContent className="flex-1 p-0 overflow-hidden bg-slate-50 dark:bg-slate-950/50">
                        <ScrollArea ref={scrollAreaRef} className="h-full px-4 py-4">
                            <div className="flex flex-col gap-4">
                                {messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={cn(
                                            "flex flex-col gap-1 rounded-2xl px-4 py-3 text-sm shadow-sm max-w-[85%] break-words",
                                            msg.role === "user"
                                                ? "ml-auto bg-indigo-600 text-white rounded-br-none"
                                                : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-none border border-slate-100 dark:border-slate-700"
                                        )}
                                    >
                                        <p className="whitespace-pre-wrap leading-relaxed break-words">{msg.text}</p>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex w-max items-center gap-2 rounded-2xl bg-white dark:bg-slate-800 px-4 py-3 text-sm shadow-sm border border-slate-100 dark:border-slate-700 rounded-bl-none">
                                        <Loader2 className="h-4 w-4 animate-spin text-indigo-500" />
                                        <span className="text-slate-500 animate-pulse">Thinking...</span>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>

                    {/* Input Area */}
                    <CardFooter className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex w-full items-center gap-2">
                            <Input
                                ref={inputRef}
                                placeholder="Ask about placement..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="flex-1 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-indigo-500"
                                disabled={isLoading}
                            />
                            <Button
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                size="icon"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white shrink-0 rounded-full h-10 w-10 shadow-md transition-transform active:scale-95"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>

            {/* Floating Toggle Button */}
            <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Greeting Popup */}
                <div
                    className={cn(
                        "absolute bottom-full right-0 mb-4 whitespace-nowrap bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 px-4 py-2 rounded-2xl rounded-br-none shadow-lg border border-slate-200 dark:border-slate-700 transition-all duration-500 ease-out z-[60]",
                        !isOpen && showGreeting ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
                    )}
                >
                    <p className="font-medium text-sm">Hi! How can I Assist you with placements!? 👋</p>
                </div>

                <Button
                    onClick={() => {
                        setIsOpen(!isOpen);
                        setShowGreeting(false); // Hide greeting when clicked
                    }}
                    size="lg"
                    className={cn(
                        "h-14 w-14 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:scale-105 active:scale-95 bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-4 border-white dark:border-slate-800 relative z-10",
                        isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
                    )}
                >
                    <MessageSquare className="h-7 w-7" />
                    {/* Pulse effect */}
                    <span className="absolute -inset-1 rounded-full bg-indigo-500 opacity-20 animate-ping pointer-events-none"></span>
                </Button>
            </div>

            {/* Close button that appears when chat is open (optional, users usually just click the X in header) 
          But keeping the main FAB hidden when open is a cleaner design choice for this specific UI.
      */}
        </div>
    );
}
