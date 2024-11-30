const axios = require('axios');

exports.config = {
    name: 'lyrist',
    author: 'Developer',
    description: 'search your fav lyrics',
    method: 'get',
    category: 'search',
    link: ['/lyrist?q=']
};

exports.initialize = async function ({ req, res }) {
    let { q } = req.query;
    if (!q) {
        return res.status(400).json({ error: 'No query provided' });
    }

    try {
        const response = await axios.get('https://lyrist.vercel.app/api/' + encodeURIComponent(q));
        const result = response.data;
        return res.json({ result });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
