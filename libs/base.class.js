const config         = require("../config.js")
const {db, dbConfig} = require('./db/mysql')
const logger         = require("./log/logger.js")
const mysqlPromise   = require('mysql2/promise');
const Functions      = require("./functions.js")


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

    /**
     * Generate invoice number.
     *
     * A0G2012345678
     * [year - 2018] [Order type char (A-D) ]  [month index(ABCDEFGHIJKLM)] [full day] [8-digis random number]
     *
     * Consumer order       -   A
     * Dealer order         -   B
     * Dealer credidt       -   C
     * Dealer subscription  -   D
     *
     * @param  {String} [tableName='order'] [description]
     * @return {[type]}                     [description]
     */
    makeInvoiceNumber(tableName = 'order'){

        if (tableName.toLowerCase() == 'dealer_credits'){
            var order_type = 'D'
        }else if (tableName.toLowerCase() == 'dealer_plan_subscription'){
            var order_type = 'C'
        }else if(tableName.toLowerCase() == 'dealer_order'){
            var order_type = 'B'
        }else{ // consumer purchase order
            var order_type = 'A'
        }

        var now         = new Date();

        // date
        var year_num    = now.getFullYear().toString().slice(-2)
        var month       = `0${(now.getMonth() + 1) }`.slice(-2)
        var day_num     = ("0" + now.getDate().toString()).slice(-2)

        // time
        var hours = `0${now.getHours()}`.slice(-2)

        // random numbers
        var charset = "0123456789ABCDEFGH",
            random = "";
        for (var i = 0; i < 6; ++i) {
            random += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        var invoice_num = `${order_type}${year_num}${month}${day_num}-${hours}${random}`

        return invoice_num
    }

    // Using database table name to do paging.
    calsPaging(table, page, rows, filters = [], orderby, next){
        // get total rows
        var sql_count = `SELECT COUNT(*) as rows FROM ${config.dbPrefix}${table} `;

        var sql = `SELECT * FROM ${config.dbPrefix}${table} `

        if(filters.length){
            sql_count += ` WHERE `+filters.join(" AND ")
            sql += ` WHERE `+filters.join(" AND ")
        }

        this.paging(sql_count, sql, page, rows, orderby, next)
    }// end func

    // Using customized sql to do paging.
    paging(sql_count, sql, page, rows_per_page, orderby, next){
        let self = this

        try{
            // get total rows
            db.query(sql_count, function (error, results, fields) {
                if(error){
                    next(error)
                }else{
                    if(results.length){
                        var total_rows   = results[0].rows
                        var total_amount = results[0].total_amount
                    }
                    else{
                        var total_rows   = 0
                        var total_amount = 0
                    }



                    let offset = 0;
                    let pages = Math.ceil(total_rows / rows_per_page)

                    // console.log(sql)
                    // console.log(results)

                    // If page is overflowed
                    if(page > pages){
                        page = pages
                    }

                    // cals offset
                    if(page > 1){
                        offset = (page-1) * rows_per_page;
                    }

                    if(orderby){
                        sql += " "+orderby
                    }

                    sql += ` LIMIT ${offset}, ${rows_per_page} `
                    // console.log('-------------------');
                    // console.log(sql)
                    //
                    // console.log('total_rows:'+total_rows)
                    // console.log('pages:'+pages)
                    // console.log('page:'+page)
                    // console.log('offset:'+offset)
                    // console.log('rows_per_page:'+rows_per_page)


                    db.query(sql, [orderby], function (error, results, fields) {
                        next(error, results, fields, total_rows, total_amount)
                    });
                }

            });
        }catch(error){
            next(error)
        }


    }// end func

    /**
     * Handle sending response
     * @param  {object} res            The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
     * @param  {[type]} [error=null]   [description]
     * @param  {Object} [data={status: 'ok'}]        [description]
     * @return {[type]}                [description]
     */
    // sendResponse(res, error = null, data ={status: 'ok'}){
    //     console.log(error);
    //     if(res){
    //         if(error){
    //             logger.system.warn(error)
    //
    //             res.status(this.httpCode.fail).json(this.encode({error: error}))
    //         }else{
    //             res.status(this.httpCode.ok).json(this.encode(data))
    //         }
    //     }else{
    //         var error = "The res object is undefined when sending response."
    //         logger.system.error(this.encode(error))
    //     }
    //
    // }

    async newInvoiceNumber(tableName){
        const dbPromise = await mysqlPromise.createConnection(dbConfig);

        do{
            var invoiceNum = this.makeInvoiceNumber(tableName);
            const [rows]   = await dbPromise.execute(`SELECT id FROM ${config.dbPrefix + 'orders'} WHERE invoice_number = ?`, [ invoiceNum ] );

            var exit = rows.length>0 ? false : true;
        }while(exit === false)

        return invoiceNum
    }

    validatePaymentInfo(billingInfo){
        var error = null
        if(!billingInfo.card_type){
            error = "Please select a card type."
        }
        else if(!config.card_type[billingInfo.card_type]){
            error = "You have selected invalid card type."
        }
        else if(!billingInfo.card_num){
            error = "Please enter card number."
        }
        else if(!this.luhn(billingInfo.card_num)){
            error = "Card number is not correct."
        }
        else if(!billingInfo.fname){
            error = "Please enter cardholder's first name. "
        }
        else if(!billingInfo.lname){
            error = "Please enter cardholder's last name. "
        }
        else if(billingInfo.exp_month < 1 || billingInfo.exp_month > 12 ){
            error = "Please select a valid month."
        }
        else if(billingInfo.exp_year < this.current_year ){
            error = "Please select a valid year."
        }
        else if(billingInfo.exp_year == this.current_year && billingInfo.exp_month < this.current_month  ){
            error = "You have entered an expired credit card."
        // }else if(!billingInfo.ccv || billingInfo.ccv.length < 3 ){
        //     error = "Please enter a valid security code."
        }
        else if(!billingInfo.zip){
            error = "Please enter your billing zip code."
        }
        else if(billingInfo.zip.length < 3){
            error = "The zip code you have entered is invalid, please enter a valid zip."
        }

        return new Promise((resolve, reject)=>{
            if(error){
                reject(error)
            }else{
                resolve(true)
            }
        })

    }
    /*
    validatePaymentInfo_old(payment_method, card_type, card_num, holder_name, exp_year, exp_month, ccv, zip,
                        routing_num, account_num, name_on_account, account_type){
        if(!payment_method || ! config.payment_method[payment_method] ){
            error = "Invalid payment method."
        }else if( payment_method.toUpperCase() == 'card'.toUpperCase() ){

            if(!card_num){
                error = "Please enter credit card number."
            }else if(!this.luhn(card_num)){
                error = "Invalid card number."
            }else if(!config.card_type[card_type]){
                error = "Please select a valid card type."
            }else if(!holder_name){
                error = "Please enter card holder's name"
            }else if(exp_month < 1 || exp_month > 12 ){
                error = "Please select a valid month."
            }else if(exp_year < this.current_year ||
                    exp_year > this.current_year + 20 ){
                error = "Please select a valid year."
            }else if(exp_year == this.current_year
                 && exp_month < this.current_month  ){
                error = "You have entered an expired credit card."
            // }else if(!ccv || ccv.length < 3 ){
            //     error = "Please enter a valid security code."
            }else if(!zip){
                error = "Please enter zip."
            }else if(zip.length < 3){
                error = "Please enter a valid zip."
            }

        }else{

            if(!routing_num ){
                error = "Please enter routing number."
            }else if(routing_num.length != 9 ){
                error = "Invalid routing number length."
            }else if(!account_num){
                error = "Please enter routing number."
            }else if(account_num.length < 7 || account_num.length > 17 ){
                error = "Invalid account number length."
            }else if(!name_on_account){
                error = "Please enter the name on account."
            }else if(name_on_account < 3 ){
                error = "Invalid length of name on account."
            }else if(!account_type){
                error = "Please select account type."
            }else if(!config.account_type[ account_type ]){
                error = "Invalid account type."
            }
        }
    }
    */

    // LOOKS DOES NOT NEED THIS FUNCITON
    // NEVER USED
    removeVinsFromSession( vin_arr, vins_session ){
        logger.system.info(`Remove vins from session *** start `)

        logger.system.info( "1. session" )
        logger.system.info( vins_session )

        var stack = []
        vin_arr.forEach(vin=>{
            if(vins_session.indexOf(vin) < 0){
                stack.push(vin)
            }
        })

        logger.system.info( "2. session" )
        logger.system.info( stack )

        return stack
    }
}

module.exports = BaseClass
