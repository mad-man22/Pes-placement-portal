
// Simple script to check Gemini models using fetch
// Replace with your actual key hardcoded to avoid dotenv issues in this temp script
const API_KEY = "AIzaSyASLLI-ncw54E2J9kTkc7cMwQZX0FmONIc";

async function listModels() {
    try {
        console.log("Checking available models for key ending in...", API_KEY.slice(-4));

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
        const data = await response.json();

        if (data.models) {
            console.log("Available Models:");
            data.models.forEach(m => {
                if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
                    console.log(`- ${m.name}`);
                }
            });
        } else {
            console.log("No models found or error:", data);
        }

    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
