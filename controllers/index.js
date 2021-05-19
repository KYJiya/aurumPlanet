const { Sequelize } = require('sequelize');
const { Theme, User, Page, Highlight } = require('../models');

async function oneAPI (req, res, next) {
    try {
        // find or create table data for pageUrl
        const pages = await Page.findOrCreate({
            attributes: ['pageId'],
            where: {
                pageUrl: req.body.pageUrl,
            },
        });
        const pageId = await pages.map((pageId) => pageId.pageId);

        // find table data for colorHex
        const themes = await Theme.findAll({
            attributes: ['themeId', 'color1'],
            where: {
                color1: req.body.colorHex,
            },
        });
        const theme = await themes.map((theme) => theme.themeId);

        // create table data for highlight
        const highlights = await Highlight.create({
            text: req.body.text,
            themeId: theme[0],
            userId: req.body.userId,
            pageId: pageId[0],
        });
        const highlight = await highlights.dataValues.highlightId;
        
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
        var pageId;
        if (req.body.colorHex) {
            console.log(req.body.colorHex);
            const themes = await Theme.findAll({
                attributes: ['themeId', 'color1'],
                where: {
                    color1: req.body.colorHex,
                },
            });
            const theme = await themes.map((theme) => theme.themeId);

            await Highlight.update({
                themeId: theme[0],
                updated_at: Sequelize.fn('NOW'),
            }, {
                where: {
                    highlightId: req.body.highlightId,
                    userId: req.body.userId,
                }
            });
            const highlights = await Highlight.findAll({
                attributes: ['pageId'],
                where: {
                    highlightId: req.body.highlightId,
                    userId: req.body.userId,
                }
            });
            var pageId = await highlights.map((pageId) => pageId.pageId);
        }
        
        if (req.body.text) {
            await Highlight.update({
                text: req.body.text,
                updated_at: Sequelize.fn('NOW'),
            }, {
                where: {
                    highlightId: req.body.highlightId,
                    userId: req.body.userId,
                }
            });
            const highlights = await Highlight.findAll({
                attributes: ['pageId'],
                where: {
                    highlightId: req.body.highlightId,
                    userId: req.body.userId,
                }
            });
            var pageId = await highlights.map((pageId) => pageId.pageId);
        }

        if (req.body.colorHex == null && req.body.text == null) {
            res.status(202).json("put in colorHex or text");
        }

        res.status(201).json({
            highlightId: req.body.highlightId,
            userId: req.body.userId,
            pageId: pageId[0].toString(),
            colorHex: req.body.colorHex,
            test: req.body.text,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

module.exports = {
    oneAPI: oneAPI,
    twoAPI: twoAPI,
}