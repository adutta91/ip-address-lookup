/*jshint esversion: 6 */

const express = require('express');
const router = express.Router();

const moment = require("moment");
const config = require("../config.public.js");
const logger = require("../libs/log/logger.js");
const _Func  = require('../libs/functions.js');
const _Ip    = require("../libs/ip.class.js")


/**
 * IP lookup.
 * @type {[type]}
 */
router.post(config.url.lookup, (req, res) => {
    try {
        logger.system.info(`IP lookup *** start `);

        var data = req.body;

        if(data.ip){
            res.send(data);
        }
        else{
            res.status(config.httpCode.fail).send('IP address is required.');
        }        

    } catch (err) {
        logger.system.error(err);
    }

})

module.exports = router;
