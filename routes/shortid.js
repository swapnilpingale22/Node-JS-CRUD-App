const express = require("express");

const { handleRedirectUrl } = require("../controllers/url")

const router = express.Router();

router.get('/:shortId', handleRedirectUrl);

module.exports = router;