const nexo = require("nexo-aio-downloader");

exports.config = {
    name: 'downloader',
    author: 'Lance Cochangco',
    description: 'Downloads media from various platforms like Twitter, Instagram, Facebook, etc.',
    method: 'get',
    category: 'downloader',
    link: ['/downloader']
};

// Supported platforms with regex patterns for flexibility
const supportedPlatforms = {
    twitter: /https?:\/\/(www\.)?(twitter\.com|x\.com)\/.*/,
    instagram: /https?:\/\/(www\.)?instagram\.com\/.*/,
    facebook: /https?:\/\/(www\.)?facebook\.com(\/share\/v\/)?.*/,
    tiktok: /https?:\/\/(www\.)?(tiktok\.com|vt\.tiktok\.com)\/.*/,
    "google-drive": /https?:\/\/(www\.)?drive\.google\.com\/.*/,
    sfile: /https?:\/\/(www\.)?sfile\.mobi\/.*/
};

exports.initialize = async function ({ req, res }) {
    try {
        let url = req.query.url;

        if (!url) {
            return res.status(400).json({ error: "Please add ?url=media_url_here" });
        }

        // Normalize the URL: ensure it starts with https://
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            url = "https://" + url;
        }

        // Detect platform by checking if the URL matches any supported platform regex pattern
        let platform = Object.keys(supportedPlatforms).find(key => 
            supportedPlatforms[key].test(url)
        );

        if (!platform) {
            return res.status(400).json({ error: "Unsupported URL" });
        }

        let result;
        switch (platform) {
            case 'twitter':
                result = await nexo.twitter(url);
                break;
            case 'instagram':
                result = await nexo.instagram(url);
                break;
            case 'facebook':
                result = await nexo.facebook(url);
                break;
            case 'tiktok':
                result = await nexo.tiktok(url);
                break;
            case 'google-drive':
                result = await nexo.googleDrive(url);
                break;
            case 'sfile':
                result = await nexo.sfile(url);
                break;
            default:
                return res.status(400).json({ error: "Unsupported URL" });
        }

        res.json({ content: result });
    } catch (error) {
        console.error("Error downloading media:", error);
        res.status(500).json({ error: "Failed to download media" });
    }
};