const fs = require('fs')

class ipLookup {
    constructor(){
        this.file = './data/ip-address.csv'
    }

    address2Number(ip_address){
        try{
            var arr = ip_address.split(".")

            if(arr.length == 4){
                var result =0
                for (var i = 0; i < arr.length; i++) {
                    if(arr[i] < 256){
                        result += parseInt(arr[i]) * Math.pow(256, 3-i)
                    }
                    else{
                        throw(new Error(`Invalid ip range. ${arr[i]}`))
                    }
                }

                return result
            }
            else{
                throw(new Error('invalid input.'))
            }
        }
        catch(error){
            throw(error)
        }
    }

    number2Address(ip_number){
        var stack = []
        for (var i = 0; i < 4; i++) {
            let result = parseInt(ip_number / Math.pow(256, 3-i))%256
            stack.push(result)
        }

        return stack.join('.')
    }

    filesize(size){
        var result = parseFloat(size / Math.pow(1024, 2)).toFixed(2) //mb
        return `${result} MB`
    }


}



module.exports = new ipLookup()
