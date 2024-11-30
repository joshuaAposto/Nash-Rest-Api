const axios = require('axios');

exports.config = {
    name: 'waifu',
    author: 'Lance Cochangco',
    description: 'Search for waifu images',
    method: 'get',
    category: 'search',
    link: ['/waifu?search=your_search_query']
};

exports.initialize = async function ({ req, res }) {
    try {
        const searchQuery = req.query.search;

        if (!searchQuery) {
            return res.status(400).json({ error: "Search query parameter is required" });
        }

        const url = `https://api.waifu.im/search?q=${encodeURIComponent(searchQuery)}`;
        const response = await axios.get(url);
        const data = response.data;

        res.set('Access-Control-Allow-Origin', '*');
        res.json({ 
            data,
            message: "Developed by Joshua Apostol"
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "An error occurred while fetching the data" });
    }
};
