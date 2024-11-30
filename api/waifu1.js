const fs = require('fs');
const axios = require("axios");

exports.config = {
    name: 'waifu1',
    author: 'joshua Apostol',
    description: 'Get a random NSFW waifu image',
    method: 'get',
    category: 'other',
    link: ['/waifu1']
};

exports.initialize = async function ({ req, res }) {
    try {
        const rest = (await axios.get("https://api.waifu.pics/nsfw/waifu")).data;
        const result = rest.url;
        const img = (await axios.get(result, { responseType: "arraybuffer" })).data;

        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(img);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};
