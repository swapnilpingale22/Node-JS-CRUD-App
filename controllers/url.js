// const { nanoid } = require("nanoid");

const shortid = require('shortid');

const URL = require('../models/url')

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.render("home", {
        error: "URL cannot be empty"
    })
    //  res.status(400).json({ error: "url is required" });

    const shortID = shortid();

    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });

    return res.render("home", {
        id: shortID,
    })
    // return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    try {
        const result = await URL.findOne({ shortId });
        return res.json({
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory,
        });
    } catch (error) {
        res.status(400).json({
            status: "url is invalid",
        });
    }

}

async function handleRedirectUrl(req, res) {
    const shortId = req.params.shortId;
    try {
        const entry = await URL.findOneAndUpdate({ shortId }, {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                }
            }
        });
        res.redirect(entry.redirectUrl);
    } catch (error) {
        res.status(400).json({
            status: "url is invalid",
        });
    }
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics,
    handleRedirectUrl,
};