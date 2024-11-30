const dl = require("@xaviabot/fb-downloader");
const app = require('express')();
const cors = require('cors');
app.use(cors());

exports.config = {
    name: 'fbdl',
    author: 'Lance Cochangco',
    description: 'Download Facebook videos',
    method: 'get',
    category: 'downloader',
    link: ['/fbdl?url=video_url']
};

exports.initialize = async function ({ req, res }) {
    try {
        const url = req.query.url;
        if (!url) return res.status(400).json({ error: "Missing URL!" });

        const result = await dl(url);
        res.json({ result: result.sd });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};
