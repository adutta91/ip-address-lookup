/*jshint esversion: 6 */

const config = require("../config.public.js");
const logger = require("./log/logger.js");


class BaseClass{
    // fundamental info
    constructor( ){
        this.errorMessage   = "";
    }

    static getInstance(){
        if(this.hasOwnProperty('instance') == false){
            this.instance = new this();
        }

        return this.instance;
    }

}


module.exports = BaseClass;
