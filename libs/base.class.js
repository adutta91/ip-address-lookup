const config = require("../config.public.js")
const logger = require("./log/logger.js")
const _Func  = require("./functions.js")


class BaseClass extends Functions{
    // fundamental info
    constructor( ){
        super()

        this.errorMessage   = "";
    }

    static getInstance(){
        if(this.hasOwnProperty('instance') == false){
            this.instance = new this()
        }

        return this.instance
    }

}


module.exports = BaseClass
