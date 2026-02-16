import { useState, useEffect } from "react";

export interface Article {
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string;
}

interface NewsResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}

// Fallback data for Vercel/Production where NewsAPI free plan might block requests
const FALLBACK_NEWS: Article[] = [
    {
        source: { id: "techcrunch", name: "TechCrunch" },
        author: "TechCrunch",
        title: "Tech hiring trends in 2025: What students need to know",
        description: "An in-depth look at the shifting landscape of technology hiring, focusing on AI, cybersecurity, and data science roles.",
        url: "https://techcrunch.com",
        urlToImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1000",
        publishedAt: new Date().toISOString(),
        content: "As the tech industry evolves..."
    },
    {
        source: { id: "wired", name: "Wired" },
        author: "Wired Staff",
        title: "Top 10 skills startups are looking for this placement season",
        description: "From React to Rust, here are the most in-demand programming skills for the upcoming campus recruitment drives.",
        url: "https://www.wired.com",
        urlToImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000",
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        content: "Startups are increasingly valuing..."
    },
    {
        source: { id: "verge", name: "The Verge" },
        author: "The Verge",
        title: "Major tech companies announce new internship cohorts",
        description: "Google, Microsoft, and Amazon have released their schedules for the upcoming summer internship applications.",
        url: "https://www.theverge.com",
        urlToImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000",
        publishedAt: new Date(Date.now() - 172800000).toISOString(),
        content: "Internship season is upon us..."
    }
];

export const useNews = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                // In a real app, use a backend proxy. For now, client-side is strictly for demo purposes.
                const apiKey = import.meta.env.VITE_NEWS_API_KEY || "92a16259bd87480090d328aa9392dd38"; // Fallback for dev convenience

                // Construct query for tech hiring/placements
                const query = '(technology AND hiring) OR (startups AND funding) OR (tech AND layoffs) OR (campus placements) OR (tech salaries)';
                const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&language=en&pageSize=10&apiKey=${apiKey}`;

                const response = await fetch(url);
                const data: NewsResponse = await response.json();

                if (data.status === "ok") {
                    // Filter out articles without images or removed content
                    const validArticles = data.articles.filter(
                        article => article.urlToImage &&
                            article.title !== "[Removed]" &&
                            article.description
                    );
                    setArticles(validArticles);
                } else {
                    console.warn("News API limitation (likely Vercel free tier), using fallback data.");
                    setArticles(FALLBACK_NEWS); // Fallback to mock data on error
                }
            } catch (err) {
                console.error("News Fetch Error:", err);
                console.warn("Network error (likely CORS/Adblock), using fallback data.");
                setArticles(FALLBACK_NEWS); // Fallback to mock data on exception
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return { articles, loading, error };
};
