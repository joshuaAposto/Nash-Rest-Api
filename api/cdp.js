exports.config = {
    name: 'cdp',
    author: 'joshua Apostol',
    description: 'Get paired images based on random selection',
    method: 'get',
    category: 'other',
    link: ['/cdp']
};

exports.initialize = async function ({ req, res }) {
    try {
        let right;
        const lefts = [
            "https://i.imgur.com/CKBhCPU.jpeg",
            "https://i.imgur.com/cS25z02.jpeg",
            "https://i.imgur.com/S7yecqx.jpeg",
            "https://i.imgur.com/pHQ4ntS.jpeg",
            "https://i.imgur.com/ktVjsL6.jpeg",
            "https://i.imgur.com/s7IGfvD.jpeg",
            "https://i.imgur.com/ZUopAHM.jpeg",
            "https://i.imgur.com/42B5D69.jpeg",
            "https://i.imgur.com/znCkgX0.jpeg",
            "https://i.imgur.com/xGruJAY.jpeg",
            "https://i.imgur.com/teUatlR.jpeg",
            "https://i.imgur.com/8SVtD6C.jpeg",
            "https://i.imgur.com/1AGkR50.jpeg",
            "https://i.imgur.com/TCguoYj.jpeg",
        ];
        const left = lefts[Math.floor(Math.random() * lefts.length)];

        const pairs = {
            "https://i.imgur.com/CKBhCPU.jpeg": "https://i.imgur.com/Cjdq1Co.jpeg",
            "https://i.imgur.com/cS25z02.jpeg": "https://i.imgur.com/crzTDET.jpeg",
            "https://i.imgur.com/S7yecqx.jpeg": "https://i.imgur.com/q5OVXXn.jpeg",
            "https://i.imgur.com/pHQ4ntS.jpeg": "https://i.imgur.com/mVluerp.jpeg",
            "https://i.imgur.com/ktVjsL6.jpeg": "https://i.imgur.com/bVTB2Rr.jpeg",
            "https://i.imgur.com/s7IGfvD.jpeg": "https://i.imgur.com/VCrJ6MR.jpeg",
            "https://i.imgur.com/ZUopAHM.jpeg": "https://i.imgur.com/RrWRmcz.jpeg",
            "https://i.imgur.com/42B5D69.jpeg": "https://i.imgur.com/zrtfzXC.jpeg",
            "https://i.imgur.com/znCkgX0.jpeg": "https://i.imgur.com/5r0oRBb.jpeg",
            "https://i.imgur.com/xGruJAY.jpeg": "https://i.imgur.com/lREKgHF.jpeg",
            "https://i.imgur.com/teUatlR.jpeg": "https://i.imgur.com/BPmD8wI.jpeg",
            "https://i.imgur.com/8SVtD6C.jpeg": "https://i.imgur.com/kopqm5J.jpeg",
            "https://i.imgur.com/1AGkR50.jpeg": "https://i.imgur.com/pP2yRJF.jpeg",
            "https://i.imgur.com/TCguoYj.jpeg": "https://i.imgur.com/glm9d9c.jpeg",
        };

        right = pairs[left];

        return res.json({
            message: "success",
            result: {
                one: left,
                two: right,
            },
        });
    } catch (error) {
        return res.json({
            message: "error",
            result: error.message,
        });
    }
};
