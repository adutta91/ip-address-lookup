const config  = require("../../config.public.js")
const winston = require('winston');
const moment  = require('moment');


// create formatter for dates used as timestamps
// const tsFormat = () => (new Date()).toLocaleTimeString();
const tsFormat = () => moment().format('YYYY-MM-DD kk:mm:ss').trim();

var logger = new(winston.Logger)({
    transports: [
        new(winston.transports.File)({
            level       : 'info',
            name        : 'info-file',
            timestamp   : tsFormat,
            json        : false,
            filename    : config.log.info_file,
            // prettyPrint : true,
            // colorize    : true,
            // formatter   : myLogFormatter,
        }),

        new(winston.transports.File)({
            level       : 'error',
            name        : 'error-file',
            timestamp   : tsFormat,
            json        : false,
            filename    : config.log.error_file,
            // prettyPrint : true,
            // colorize    : true,
            // formatter   : myLogFormatter,
        }),

        new(winston.transports.File)({
            level       : 'debug',
            name        : 'debug-file',
            timestamp   : tsFormat,
            json        : false,
            filename    : config.log.debug_file,
            // prettyPrint : true,
            // colorize    : true,
            // formatter   : myLogFormatter,
        })
    ]
})

module.exports.system = logger
