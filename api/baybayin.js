const axios = require("axios");

exports.config = {
    name: 'baybayin',
    author: 'joshua Apostol',
    description: 'Translate text to Baybayin',
    method: 'get',
    category: 'other',
    link: ['/baybayin?q=hi']
};

exports.initialize = async function ({ req, res }) {
    try {
        const q = req.query.q;
        if (!q) return res.status(400).json({ error: "Missing q parameter!" });

        const response = await axios.get(
            "https://api-baybayin-transliterator.vercel.app/?text=" + encodeURIComponent(q)
        );

        const result = response.data.baybayin;

        return res.status(200).json({ status: true, result, author: "joshua Apostol" });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};
