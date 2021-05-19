const { Theme, User, Page, Highlight } = require('../models');

async function oneAPI (req, res, next) {
    try {
        const pages = await Page.findOrCreate({
            attributes: ['pageId'],
            where: {
                pageUrl: req.body.pageUrl,
            },
        });

        const pageId = await pages.map((pageId) => pageId.pageId);

        const themes = await Theme.findAll({
            attributes: ['themeId', 'color1'],
            where: {
                color1: req.body.colorHex,
            },
        });

        const theme = await themes.map((theme) => theme.themeId);

        const highlights = await Highlight.create({
            text: req.body.text,
            themeId: theme[0],
            pageId: pageId[0],
        });

        const highlight = await highlights.dataValues.highlightId;

        await highlights.addUser(req.body.userId);
        
        res.status(201).json({
            highlightId: highlight,
            userId: req.body.userId,
            pageId: pageId[0],
            colorHex: req.body.colorHex,
            text: req.body.text,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

async function twoAPI (req, res, next) {
    try {
        
    } catch (err) {
        console.error(err);
        next(err);
    }
}

module.exports = {
    oneAPI: oneAPI,
    twoAPI: twoAPI,
}