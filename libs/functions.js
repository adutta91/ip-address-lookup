const moment = require('moment')
const config = require("../config.public.js")

class Functions {

    constructor(){

        this.httpCode = {
            done    : 204, /* No Content - The server successfully processed the request and is not returning any content. */
            ok      : 200,
            fail    : 400,
            unauth  : 401,
            error   : 500,
        }

        this.status = {
            ok      : 'ok',
            fail    : 'fail',
            unauth  : 'unauth'
        }

        this.httpMessage = {
            unable_place_order : "There was an error processing your order. Please contact us or try again later."
        }
    }

    static getInstance(){
        if(this.hasOwnProperty('instance') == false){
            this.instance = new this(config)
        }

        return this.instance
    }

    handelError(map){
        if(map.error && typeof map.error == 'string' ){
            return map.error
        }else{
            return config.error.error500
        }
    }

    formatDate(str, longDate, withTime){
        if(str){
            if(longDate && withTime){
                return moment(str).format( "MMMM D, YYYY, h:mm a" )
            }else if(longDate){
                return moment(str).format( "MMMM D, YYYY" )
            }else if(withTime){
                return moment(str).format( "MM/DD/YYYY h:mm a" )
            }else{
                return moment(str).format( "MM/DD/YYYY" )
            }
        }
    }

    formatTime(str){
        // 09:47:20
        var arr = str.split(":")
        var amorpm  = arr[0] >= 12? 'PM' : 'AM'
        var hour    = arr[0] > 12 ? arr[0] - 12 : arr[0]
        var minutes = arr[1]

        return `${hour}:${minutes}${amorpm}`

    }

    isNumber(num){
        if(num.toString().match(/^\d+$/) || num.toString().match(/^\d+\,\d+$/)){
            return true
        }else if(num.toString().match(/^\d+\.\d+$/)){
            return true
        }
    }

    purifiedNumber(number){
        if(number){
            return parseFloat(number.toString().replace(/,/g, ''))
        }else{
            return parseFloat(number)
        }
    }

    generatePassword(length = 8) {
        var charset = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789!@",
            retVal = "";
        for (var i = 0; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return retVal;
    }

    ucfirst(str){
        if(str && str.length){
            return str.toLowerCase().charAt(0).toUpperCase() + str.toLowerCase().slice(1)
        }

    }

    getIp(req){
        if(req){
            var ip;
            if (req.headers['x-forwarded-for']) {
                ip = req.headers['x-forwarded-for'].split(",")[0];
            } else if (req.connection && req.connection.remoteAddress) {
                ip = req.connection.remoteAddress;
            } else {
                ip = req.ip;
            }

            return ip;
        }
    }

}


module.exports = Functions.getInstance()
