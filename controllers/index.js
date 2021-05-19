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
        
        const user = await User.findOne({
            where: {
                userId: req.body.userId,
            },
        });
        await user.addPage(pageId[0]);

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

        // put in colorHex value
        if (req.body.colorHex) {
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
        
        // put in text value
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

        // exception
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
};

async function threeAPI (req, res, next) {
    try {
        if (!req.body.pageId && !req.body.pageUrl) {
            res.status(202).json("put in pageId or pageUrl");
            return next;
        }
        
        var pageId;
        if (!req.body.pageId) {
            const pages = await Page.findOne({
                attributes: ['pageId'],
                where: {
                    pageUrl: req.body.pageUrl,
                }
            });
            pageId = await pages.dataValues.pageId;
        }

        if (req.body.pageId) {
            pageId = await req.body.pageId;
        }
        
        const highlights = await Highlight.findAll({
            order: [
                ['updated_at', 'DESC'],
            ],
            where: {
                pageId: pageId,
            }
        });    
        
        res.status(201).json(highlights);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

async function fourAPI (req, res, next) {
    try {
        const pages = await Page.findAll({
            include: [{
                model: User,
            }],
            order: [
                ['updated_at', 'DESC'],
            ]
        });

        console.log(pages);
        // const tempJson = JSON.parse(pages);
        // console.log(tempJson);

        // for (const i = 0; i < pages.length; i++) {    
        //     const highlights = await Highlight.findAll({
        //         order: [
        //             ['updated_at', 'DESC'],
        //         ],
        //         where: {
        //             pageId: page[i],
        //         }
        //     });
        // }

        res.status(201).json("hi");
    } catch (err) {
        console.error(err);
        next(err);
    }
};

module.exports = {
    oneAPI: oneAPI,
    twoAPI: twoAPI,
    threeAPI: threeAPI,
    fourAPI: fourAPI,
};