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
        // console.log('data: ', data);        

        if(data.ip){
            if(_Ip.isAnIpAdress(data.ip)){
                let result = _Ip.lookupIPAddress(data.ip)
                res.json(result);
            }
            else{
                throw('Invalid IP address.')
            }            
        }
        else{
            throw('IP address is required.');
        }
    } catch (err) {
        logger.system.error(err);
        res.status(config.httpCode.fail).send(err);
    }
});

module.exports = router;
