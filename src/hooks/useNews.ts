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
                    console.error("News API Error:", data);
                    setError("Failed to fetch news.");
                }
            } catch (err) {
                console.error("News Fetch Error:", err);
                setError("Network error while fetching news.");
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return { articles, loading, error };
};
