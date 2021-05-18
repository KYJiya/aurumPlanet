const Highlight = require('../models/highlight');

async function oneAPI (req, res, next) {
    try {
        const highlight = await Highlight.create({
            userId: req.body.userId,
            pageUrl: req.body.pageUrl,
            colorHex: req.body.colorHex,
            text: req.body.text,
        });
        console.log(highlight);
        res.status(201).json(highlight);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

module.exports = {
    oneAPI: oneAPI
}