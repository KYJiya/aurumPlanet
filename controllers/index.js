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

        res.status(201).json(highlight);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

async function twoAPI (req, res, next) {
    try {
        // exception
        if (!req.body.colorHex && !req.body.text) {
            res.status(202).json("put in colorHex or text");
            return next;
        }

        var themes;
        
        // put in colorHex value
        if (req.body.colorHex) {
            themes = await Theme.findAll({
                attributes: ['themeId', 'color1'],
                where: {
                    color1: req.body.colorHex,
                },
            });
            theme = await themes.map((theme) => theme.themeId);

            await Highlight.update({
                themeId: theme[0],
                updated_at: Sequelize.fn('NOW'),
            }, {
                where: {
                    highlightId: req.body.highlightId,
                    userId: req.body.userId,
                }
            });
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
        }

        const highlight = await Highlight.findOne({
            where: {
                highlightId: req.body.highlightId,
                userId: req.body.userId,
            }
        })

        res.status(201).json(highlight);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

async function threeAPI (req, res, next) {
    try {
        // pageId and pageUrl are not then just return
        if (!req.body.pageId && !req.body.pageUrl) {
            res.status(202).json("put in pageId or pageUrl");
            return next;
        }
        
        // always need pageId but is not then make by pageUrl
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
        
        // always drive
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
        // read page info by userId
        const pages = await Page.findAll({
            include: [{
                model: User,
                where: {
                    userId: req.body.userId,
                },
            }],
            order: [
                ['updated_at', 'DESC'],
            ]
        });
        
        var tempJson = await pages.map((pages) => pages.dataValues);

        // read highlight info by pageId
        for (var i = 0; i < tempJson.length; i++) {    
            var highlights = await Highlight.findAll({
                order: [
                    ['updated_at', 'DESC'],
                ],
                where: {
                    pageId: tempJson[i].pageId,
                }
            });
            var tempHighlights = await highlights.map((highlights) => highlights.dataValues);

            tempJson[i].highlights = tempHighlights;
        }

        // sorted by anti-timeline by 
        tempJson.sort(function(a, b) {
            return a.highlights.map((map) => map.updated_at) > 
                   b.highlights.map((map) => map.updated_at) ? -1 : 
                   a.highlights.map((map) => map.updated_at) < 
                   b.highlights.map((map) => map.updated_at) ? 1 : 0;
        });

        res.status(201).json(tempJson);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

async function fiveAPI (req, res, next) {
    try {
        // destroy highlight in the list of highlights
        const highlights = await Highlight.destroy({
            where: {
                highlightId: req.body.highlightId,
                userId: req.body.userId,
            }
        })

        res.status(201).json("delete ok");
    } catch (err) {
        console.error(err);
        next(err);
    }
}

async function sixAPI (req, res, next) {
    try {
        // just updated themeId is related themeTable
        await Highlight.update({
            themeId: req.body.themeId,
            updated_at: Sequelize.fn('NOW'),
        }, {
            where: {
               userId: req.body.userId,
            }
        });

        res.status(201).json("theme is changed");
    } catch (err) {
        console.error(err);
        next(err);
    }
}

module.exports = {
    oneAPI: oneAPI,
    twoAPI: twoAPI,
    threeAPI: threeAPI,
    fourAPI: fourAPI,
    fiveAPI: fiveAPI,
    sixAPI: sixAPI,
};