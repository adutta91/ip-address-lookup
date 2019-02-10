var express = require('express');
var router = express.Router();

const config = require("../config.public.js")
const logger = require("../libs/log/logger.js")
const _Func  = require("../libs/functions.js")

router.all('/', (req, res) => {
    let client_ip = _Func.getIp(req)
    logger.system.info(`Access from ip address: ${client_ip}`)

    res.render('index', {
        session : req.session,
        config  : config,
    })

})


module.exports = router;
