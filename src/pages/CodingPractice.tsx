
import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, RotateCcw, CheckCircle2, AlertCircle, Loader2, Code2, RefreshCcw } from "lucide-react";
import Layout from "@/components/Layout";
import axios from "axios";
import { toast } from "sonner";

interface Language {
    name: string;
    id: string;
    versionIndex: string;
}

// Language Options for JDoodle API
const LANGUAGES: Language[] = [
    { name: "Python 3", id: "python3", versionIndex: "4" },
    { name: "Java", id: "java", versionIndex: "4" },
    { name: "C++ 17", id: "cpp17", versionIndex: "1" },
    { name: "NodeJS", id: "nodejs", versionIndex: "4" },
    { name: "C", id: "c", versionIndex: "5" },
    { name: "C#", id: "csharp", versionIndex: "4" },
    { name: "Ruby", id: "ruby", versionIndex: "4" },
    { name: "Swift", id: "swift", versionIndex: "4" },
    { name: "Kotlin", id: "kotlin", versionIndex: "3" },
    { name: "Go", id: "go", versionIndex: "4" },
];

// Map JDoodle IDs to Monaco Editor Languages
const MONACO_LANG_MAP: Record<string, string> = {
    python3: "python",
    java: "java",
    cpp17: "cpp",
    nodejs: "javascript",
    c: "c",
    csharp: "csharp",
    ruby: "ruby",
    swift: "swift",
    kotlin: "kotlin",
    go: "go"
};

// Map JDoodle IDs to LeetCode Snippet Slugs (internal keys)
const SNIPPET_KEY_MAP: Record<string, string> = {
    python3: "python", // We store as 'python'
    java: "java",
    cpp17: "cpp",
    nodejs: "javascript",
    c: "c",
    csharp: "csharp",
    ruby: "ruby",
    swift: "swift",
    kotlin: "kotlin",
    go: "golang" // LeetCode uses 'golang' usually
};

// Sample Problem
const PROBLEM = {
    title: "Two Sum",
    difficulty: "Easy",
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

**Example 1:**
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

**Example 2:**
Input: nums = [3,2,4], target = 6
Output: [1,2]`,
    starterCode: {
        python: `def two_sum(nums, target):
    pass`,
        javascript: `function twoSum(nums, target) {
}`,
        // Add placeholders for others if needed, but fetchRandomProblem overwrites
    }
};

const CodingPractice = () => {
    const [language, setLanguage] = useState(LANGUAGES[0]);
    const [difficulty, setDifficulty] = useState("Easy");
    const [problem, setProblem] = useState<any>(null);
    const [code, setCode] = useState("");
    const [output, setOutput] = useState<string | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLoadingProblem, setIsLoadingProblem] = useState(true);

    // Test Case State
    const [activeTab, setActiveTab] = useState<"description">("description");
    const [testCases, setTestCases] = useState<string[]>([]);
    const [expectedOutputs, setExpectedOutputs] = useState<string[]>([]);
    const [activeTestCaseId, setActiveTestCaseId] = useState(0);

    // Helper: Estimate argument count from starter code
    const getArgCount = (code: string) => {
        if (!code) return 1;
        const firstLine = code.split('\n')[0];
        const match = firstLine.match(/\(([^)]*)\)/);
        if (match && match[1]) {
            // Filter out 'self' for Python
            return match[1].split(',').filter(a => a.trim() !== 'self').length;
        }
        return 1; // Default
    };

    const groupTestCases = (rawLines: string[], argCount: number) => {
        const groups = [];
        for (let i = 0; i < rawLines.length; i += argCount) {
            // Clean quotes from string inputs if they are standalone strings
            const chunk = rawLines.slice(i, i + argCount).map(line => {
                const trimmed = line.trim();
                // Check if it's a quoted string
                if (trimmed.startsWith('"') && trimmed.endsWith('"') && !trimmed.includes(',')) {
                    // Simple check: single string, not a list
                    // Be careful with escaped quotes, but for now:
                    return trimmed.slice(1, -1);
                }
                return trimmed;
            });
            groups.push(chunk.join('\n'));
        }
        return groups;
    };

    const fetchRandomProblem = async () => {
        setIsLoadingProblem(true);
        setOutput(null);
        setTestCases([]);
        setExpectedOutputs([]);
        setActiveTab("description");

        try {
            const response = await axios.get("/api/leetcode/problems?limit=100");
            const allProblems = response.data.problemsetQuestionList || [];
            const filtered = allProblems.filter((p: any) => p.difficulty === difficulty);

            if (filtered.length === 0) {
                toast.error(`No ${difficulty} problems found in current batch. Try again.`);
                setIsLoadingProblem(false);
                return;
            }

            const randomProblem = filtered[Math.floor(Math.random() * filtered.length)];
            const titleSlug = randomProblem.titleSlug;
            const detailResponse = await axios.get(`/api/leetcode/select?titleSlug=${titleSlug}`);
            const pData = detailResponse.data;

            const pythonStarter = pData.codeSnippets?.find((s: any) => s.lang === "Python3")?.code
                || "# func(arg1, arg2)";

            // Note: We do NOT inject driver here anymore. We inject it at runtime if needed.

            const argCount = getArgCount(pythonStarter);

            let parsedTestCases: string[] = [];
            if (pData.exampleTestcases) {
                const rawLines = pData.exampleTestcases.split('\n').filter((l: string) => l.trim() !== "");
                parsedTestCases = groupTestCases(rawLines, argCount);
            }

            // Parse Expected Outputs from Description
            const parsedOutputs: string[] = [];
            const desc = pData.question || "";
            // LeetCode descriptions usually follow "Output: ..." pattern in examples
            // Strategy: Split by "Example" and regex match "Output:"
            const examples = desc.split(/<strong>Example \d+:?<\/strong>/i);

            for (let i = 1; i < examples.length; i++) {
                const ex = examples[i];
                // Match Output: <value> or Output: </strong> <value>
                const outMatch = ex.match(/(?:Output:<\/strong>|Output:)\s*([^<]+|<span[^>]*>.*?<\/span>)/i);
                if (outMatch) {
                    let rawOut = outMatch[1];
                    // Clean HTML tags
                    rawOut = rawOut.replace(/<\/?span[^>]*>/g, "").replace(/<\/?code>/g, "").replace(/&nbsp;/g, " ");
                    parsedOutputs.push(rawOut.trim());
                }
            }
            // Fallback: just regex search globally if split fail
            if (parsedOutputs.length === 0) {
                const outputRegex = /Output:\s*(?:<\/strong>)?\s*(?:<span[^>]*>)?([^<]+)(?:<\/span>)?/gi;
                let match;
                while ((match = outputRegex.exec(desc)) !== null) {
                    if (match[1]) parsedOutputs.push(match[1].trim());
                }
            }

            setTestCases(parsedTestCases);
            setExpectedOutputs(parsedOutputs);

            const newProblem = {
                title: pData.questionTitle,
                difficulty: pData.difficulty,
                description: pData.question,
                starterCode: {
                    python: pythonStarter,
                    ...PROBLEM.starterCode
                }
            };

            if (pData.codeSnippets) {
                pData.codeSnippets.forEach((s: any) => {
                    // Normalize slug to our keys
                    let key = s.langSlug;
                    if (key === 'python3') key = 'python';
                    // We use the slug directly otherwise (e.g. 'c', 'cpp', 'java', 'golang')

                    // @ts-ignore
                    newProblem.starterCode[key] = s.code;
                });
            }

            setProblem(newProblem);

            // Set initial code based on current language
            const initialKey = SNIPPET_KEY_MAP[language.id] || language.id;
            // @ts-ignore
            setCode(newProblem.starterCode[initialKey] || "// Language not supported for this problem");

        } catch (error) {
            console.error("Failed to fetch problem:", error);
            toast.error("Failed to fetch new problem");
        } finally {
            setIsLoadingProblem(false);
        }
    };

    const handleLanguageChange = (langId: string) => {
        const selectedLang = LANGUAGES.find(l => l.id === langId) || LANGUAGES[0];
        setLanguage(selectedLang);

        const starterKey = SNIPPET_KEY_MAP[selectedLang.id] || selectedLang.id;

        // @ts-ignore
        setCode(problem.starterCode[starterKey] || "// Language not available");
        setOutput(null);
    };

    // Fetch random problem on mount
    useEffect(() => {
        fetchRandomProblem();
    }, []);

    // Helper: Generate Driver Code if needed
    const getCodeToRun = (originalCode: string, langId: string) => {
        if (langId !== 'python3') return originalCode;

        // Check if user is using Class Solution pattern without a driver
        const hasClass = originalCode.includes('class Solution');
        const hasMain = originalCode.includes('if __name__ == "__main__":');

        if (hasClass && !hasMain) {
            const funcMatch = originalCode.match(/def\s+([a-zA-Z0-9_]+)\s*\(/);
            const classNameMatch = originalCode.match(/class\s+([a-zA-Z0-9_]+):/);

            if (funcMatch && classNameMatch) {
                const funcName = funcMatch[1];
                const className = classNameMatch[1];
                return originalCode + `
import sys, json
if __name__ == "__main__":
    def parse_input(line):
        try: return json.loads(line)
        except: return line 

    input_lines = sys.stdin.read().splitlines()
    args = [parse_input(l) for l in input_lines if l.strip()]
    
    try:
        sol = ${className}()
        result = sol.${funcName}(*args)
        print(json.dumps(result))
    except Exception as e:
        print(e)
`;
            }
        }
        return originalCode;
    };

    const executeOne = async (stdin: string, useDriver: boolean = false) => {
        const script = useDriver ? getCodeToRun(code, language.id) : code;
        const response = await axios.post("/api/jdoodle/execute", {
            clientId: import.meta.env.VITE_JDOODLE_CLIENT_ID,
            clientSecret: import.meta.env.VITE_JDOODLE_CLIENT_SECRET,
            script: script,
            language: language.id,
            versionIndex: language.versionIndex,
            stdin: stdin
        });
        const { output, statusCode } = response.data;
        if (statusCode === 200) return { output };
        return { error: output || "Execution failed" };
    };

    const runCode = async () => {
        setIsRunning(true);
        setIsError(false);
        setOutput(null);

        // Run against selected test case input (but don't validate)
        const inputToRun = testCases[activeTestCaseId] || "";

        try {
            // Auto-detect if driver needed (e.g. class Solution)
            // User just wants "Run", so we'll try to be helpful and inject driver if it looks like a class solution
            // But strict script mode if not.
            const needsDriver = code.includes('class Solution');

            const result = await executeOne(inputToRun, needsDriver);
            if (result.error) throw new Error(result.error);
            setOutput(result.output);
        } catch (error: any) {
            console.error("Execution error:", error);
            setIsError(true);
            setOutput(error.message || "Execution Failed");
            toast.error("Execution failed");
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <Layout showBackButton={true}>
            <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-4 animate-in fade-in duration-500">

                {/* Left Panel: Problem & Tabs */}
                <div className="lg:w-1/3 bg-card border border-border rounded-xl shadow-sm flex flex-col overflow-hidden">

                    {/* Header */}
                    <div className="p-4 border-b border-border bg-slate-50 dark:bg-slate-900/50 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <Select value={difficulty} onValueChange={setDifficulty}>
                                <SelectTrigger className="w-[120px] h-8 text-xs">
                                    <SelectValue placeholder="Difficulty" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Easy">Easy</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="Hard">Hard</SelectItem>
                                </SelectContent>
                            </Select>

                            <Button size="sm" variant="ghost" onClick={fetchRandomProblem} disabled={isLoadingProblem}>
                                {isLoadingProblem ? <Loader2 className="h-4 w-4 animate-spin" /> : <RotateCcw className="h-4 w-4" />}
                                <span className="ml-2">Next</span>
                            </Button>
                        </div>

                        <div className="flex items-center justify-between">
                            <h2 className="font-bold text-xl flex items-center gap-2 truncate">
                                <Code2 className="h-5 w-5 text-primary shrink-0" />
                                <span className="truncate">{isLoadingProblem || !problem ? "Fetching..." : problem.title}</span>
                            </h2>
                            {problem && (
                                <span className={`px-2 py-1 text-xs font-bold rounded-full 
                                    ${problem.difficulty === "Easy" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                                        problem.difficulty === "Medium" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                                            "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
                                    {problem.difficulty}
                                </span>
                            )}
                        </div>

                        {/* Tabs Switcher Removed */}
                    </div>

                    {/* Content Area */}
                    <div className="p-6 overflow-y-auto flex-1 prose dark:prose-invert max-w-none text-sm relative">
                        {isLoadingProblem || !problem ? (
                            <div className="flex flex-col gap-4 animate-pulse">
                                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
                                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
                                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
                            </div>
                        ) : (
                            <div>
                                {problem.description.startsWith("<") ? (
                                    <div dangerouslySetInnerHTML={{ __html: problem.description }} />
                                ) : (
                                    <div className="whitespace-pre-wrap font-sans">{problem.description}</div>
                                )}

                                <div className="mt-8 border-t border-border pt-4 text-sm">
                                    <label className="text-xs font-semibold text-muted-foreground uppercase block mb-2">Test Case Input (Passed to stdin)</label>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {testCases.map((input, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setActiveTestCaseId(idx)}
                                                className={`px-3 py-1 text-xs border rounded-md transition-colors ${activeTestCaseId === idx ? 'bg-primary/10 border-primary text-primary' : 'border-border hover:bg-accent'}`}
                                            >
                                                Case {idx + 1}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="bg-slate-50 dark:bg-slate-900 border border-border rounded-md p-3 font-mono text-sm overflow-auto whitespace-pre max-h-32 mb-4">
                                        {testCases[activeTestCaseId] || "No test cases available"}
                                    </div>

                                    {expectedOutputs[activeTestCaseId] && (
                                        <>
                                            <label className="text-xs font-semibold text-muted-foreground uppercase block mb-2">Expected Output</label>
                                            <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md font-mono text-sm border border-border text-slate-600 dark:text-slate-400">
                                                {expectedOutputs[activeTestCaseId]}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel: Editor & Output */}
                <div className="lg:w-2/3 flex flex-col gap-4">
                    {/* Editor Toolbar */}
                    <div className="bg-card border border-border rounded-xl shadow-sm p-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Select value={language.id} onValueChange={handleLanguageChange}>
                                <SelectTrigger className="w-[180px] h-9">
                                    <SelectValue placeholder="Select Language" />
                                </SelectTrigger>
                                <SelectContent>
                                    {LANGUAGES.map(lang => (
                                        <SelectItem key={lang.id} value={lang.id}>
                                            {lang.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleLanguageChange(language.id)} title="Reset Code">
                                <RotateCcw className="h-4 w-4" />
                            </Button>
                            <Button size="sm" onClick={runCode} disabled={isRunning} className="min-w-[100px]">
                                {isRunning ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Running
                                    </>
                                ) : (
                                    <>
                                        <Play className="mr-2 h-4 w-4" />
                                        Run Code
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Code Editor */}
                    <div className="flex-1 bg-card border border-border rounded-xl shadow-sm overflow-hidden min-h-[400px]">
                        <Editor
                            height="100%"
                            language={MONACO_LANG_MAP[language.id] || language.id}
                            theme="vs-dark"
                            value={code}
                            onChange={(value) => setCode(value || "")}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                            }}
                        />
                    </div>

                    {/* Output Console */}
                    <div className="h-48 bg-slate-950 text-slate-50 border border-slate-800 rounded-xl shadow-inner flex flex-col overflow-hidden font-mono text-sm">
                        <div className="bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-400 flex items-center gap-2 border-b border-slate-800">
                            Terminal Output
                            {output && !isRunning && (
                                <span className={`ml-auto flex items-center gap-1 ${isError ? "text-red-400" : "text-green-400"}`}>
                                    {isError ? <AlertCircle className="h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />}
                                    {isError ? "Error" : "Success"}
                                </span>
                            )}
                        </div>
                        <div className="p-4 overflow-auto flex-1 whitespace-pre-wrap">
                            {isRunning ? (
                                <span className="text-slate-500 italic">Executing code...</span>
                            ) : output ? (
                                <span className={isError ? "text-red-300" : "text-slate-300"}>{output}</span>
                            ) : (
                                <span className="text-slate-600">Run your code to see output here...</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CodingPractice;
