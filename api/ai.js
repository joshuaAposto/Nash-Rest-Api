const getGPT4js = require("gpt4js");

exports.config = {
    name: 'ai',
    author: 'Lance Cochangco',
    description: 'Interact with GPT-4 via gpt4js',
    method: 'get',
    category: 'ai',
    link: ['/ai?query=hi']
};

exports.initialize = async function ({ req, res }) {
    try {
        const query = req.query.query;
        if (!query) {
            return res.status(400).json({ error: "add ?query=your_query_here" });
        }

        const GPT4js = await getGPT4js();
        const messages = [{ role: "user", content: query }];
        const options = {
            provider: "Nextway",
            model: "gpt-4o-free",
        };

        const provider = GPT4js.createProvider(options.provider);
        const text = await provider.chatCompletion(messages, options);

        res.json({ response: text });
    } catch (error) {
        console.error("Error interacting with GPT-4:", error);
        res.status(500).json({ error: "Failed to interact with GPT-4" });
    }
};
