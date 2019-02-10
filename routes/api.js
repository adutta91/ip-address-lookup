var express = require('express');
var router = express.Router();

const moment = require("moment")
const logger = require("../libs/log/logger.js")
const config = require("../config.public.js")


/**
 * IP lookup.
 * @type {[type]}
 */
router.post(config.url.lookup, (req, res) => {
    logger.system.info(`IP lookup *** start `)

    res.send('IP lookup')
})

module.exports = router;
