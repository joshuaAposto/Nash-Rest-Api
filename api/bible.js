const axios = require("axios");

exports.config = {
    name: 'bible',
    author: 'joshua Apostol',
    description: 'Get a random Bible verse',
    method: 'get',
    category: 'other',
    link: ['/bible']
};

exports.initialize = async function ({ _, res }) {
    try {
        const response = await axios.get("https://bible-api.com/?random=verse&translation=web");
        const { text: verse, reference } = response.data;
        
        return res.status(200).json({ reference, verse });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};
