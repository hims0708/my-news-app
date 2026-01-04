export default async function handler(request, response) {
    const { q } = request.query;
    const apiKey = process.env.VITE_NEWS_API_KEY || "c1f0ff492c9846a1b30b72156362aa78";

    if (!q) {
        return response.status(400).json({ error: 'Search query "q" is required' });
    }

    const url = `https://newsapi.org/v2/everything?q=${q}&apiKey=${apiKey}`;

    try {
        const apiResponse = await fetch(url);
        const data = await apiResponse.json();

        // Add CORS headers just in case
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'GET');

        return response.status(200).json(data);
    } catch (error) {
        console.error('Proxy Error:', error);
        return response.status(500).json({ error: 'Failed to fetch news from NewsAPI' });
    }
}
