const axios = require("axios");

exports.config = {
    name: 'aigen',
    author: 'Developer',
    description: 'Generate AI-based images',
    method: 'get',
    category: 'AI Image Generator',
    link: ['/aigen?prompt=']
};

exports.initialize = async function ({ req, res }) {
    let prompt = req.query.prompt;
    if (!prompt) {
        return res.status(400).json({ error: "Missing prompt parameter!" });
    }

    try {
        const response = await axios.get('https://tti.photoleapapp.com/api/v1/generate?prompt=' + encodeURIComponent(prompt));
        return res.json({ result: response.data.result_url });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
