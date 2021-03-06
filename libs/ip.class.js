/*jshint esversion: 6 */

const fs        = require('fs');
const readline  = require('readline');

const config    = require('../config.public.js')
const BaseClass = require('./base.class.js');
const _Func     = require('./functions.js');

class ipLookup extends BaseClass {
    constructor() {
        super();

        this.file = config.datafile

        this.data = [];

        this.loadData()
    }

    /**
     * Validating IP address
     * @param {string} ip_address 
     */
    isAnIpAdress(ip_address){
        if(ip_address && ip_address.length){
            let result = ip_address.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/g);

            if(result){// matched
                let arr = ip_address.split('.');
                for (const n of arr) {
                    if(n>255){
                        return false;
                    }
                    
                }
                return true;
            }
            else{
                return false;
            }
        }
    }

    /**
     * Convert address to number
     * @param {string} ip_address 
     */
    address2Number(ip_address) {
        try {
            var arr = ip_address.split(".");

            if (arr.length == 4) {
                var result = 0;
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] < 256) {
                        result += parseInt(arr[i]) * Math.pow(256, 3 - i);
                    } else {
                        throw (new Error(`Invalid ip range. ${arr[i]}`));
                    }
                }

                return result;
            } else {
                throw (new Error('invalid input.'));
            }
        } catch (error) {
            throw (error);
        }
    }

    /**
     * Convert number to address
     * @param {int} ip_number 
     */
    number2Address(ip_number) {
        var stack = [];
        for (var i = 0; i < 4; i++) {
            let result = parseInt(ip_number / Math.pow(256, 3 - i)) % 256;
            stack.push(result);
        }

        return stack.join('.');
    }

    /**
     * Convert byte to MB.
     * @param {int} size 
     */
    filesize(size) {
        var result = parseFloat(size / Math.pow(1024, 2)).toFixed(2); //mb
        return `${result} MB`;
    }

    binarySearch(ipNum){
        var first = 0,
            last  = this.data.length -1,
            mid,
            arr,
            found = false,
            count = 0;

        while(!found && first <= last){
            count++;
            mid = parseInt((first + last)/2);
            arr = this.CSVtoArray(this.data[mid]);

            if(arr[0] <= ipNum && ipNum <= arr[1]){
                found = true;
            }
            else if(arr[0] <= ipNum){ // search right tree
                first = mid +1;
            }
            else{// search left tree
                last = mid -1;
            }
        }

        if(found){
            return arr;
        }
        else{
            return false;
        }

    }

    lookupIPAddress(ipAddress){
        try{        
            let ipNum = this.address2Number(ipAddress);
            return this.binarySearch(ipNum);
        }
        catch(error){
            thorw(error);            
        }
    }

    loadData() {
        // Read data file with readline and stream

        return new Promise((resolve, reject) => {
            if(this.data.length){ // data already loaded.
                resolve(this.data.length);
            }
            else{
                var n = 0;
                let rl = readline.createInterface({
                    input: fs.createReadStream(this.file),
                    // output: process.stdout,
                    // console: false
                });

                rl.on('line', (str) => {
                    n++;
                    this.data.push(str);
                });

                rl.on('close', () => {
                    resolve(n);
                });
            }

        });

    }

    // loadData1() {
    //     // Load file without using stream

    //     return new Promise((resolve, reject) => {
    //         fs.readFile(this.file, (err, data) => {
    //             console.log(this.filesize(data.length));
    //         });
    //     });

    // }

    // loadData2() {
    //     return new Promise((resolve, reject) => {
    //         const rs = fs.createReadStream(this.file);
    //         let size = 0;
    //         let n = 0;

    //         // 2) non-flowing (pulling)
    //         var chunk;
    //         rs.on('readable', () => {
    //             do {
    //                 n++;
    //                 chunk = rs.read();
    //                 if (chunk) {
    //                     size += chunk.length;
    //                     let str = chunk.toString();
    //                     console.log(n, str[str.length - 1]);
    //                 }
    //             }
    //             while (chunk != null);
    //         });

    //         rs.on('end', () => {
    //             // stream emits an end event.
    //             console.log(`file size: `, this.filesize(size));
    //             resolve(`file size: ${this.filesize(size)}`);
    //         });
    //     });

    // }

    // loadData3() {
    //     // Read file with Stream line-by-line
    //     return new Promise((resolve, reject) => {
    //         var lineNr = 0;

    //         var rs = fs.createReadStream(this.file)
    //             .pipe(es.split())
    //             .pipe(es.mapSync(function (line) {
    //                     // pause the readstream
    //                     rs.pause();

    //                     lineNr += 1;
    //                     // console.log(lineNr, line[line.length-1]);
    //                     console.log(lineNr, line);

    //                     // resume the readstream, possibly from a callback
    //                     rs.resume();
    //                 })
    //                 .on('error', function (err) {
    //                     console.log('Error while reading file.', err);
    //                     reject(err);
    //                 })
    //                 .on('end', function () {
    //                     console.log('Read entire file.');

    //                     const used = process.memoryUsage().heapUsed / 1024 / 1024;
    //                     console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);

    //                     resolve(lineNr);
    //                 })
    //             );
    //     });

    // }

    // loadData4() {
    //     // var buf = new Buffer(JSON.stringify([10, 20, 30, 40, 50]));
    //     // console.log(buf, JSON.parse(buf.toString()));

    //     return new Promise((resolve, reject) => {
    //         const rs = fs.createReadStream(this.file);
    //         let size = 0;
    //         let n = 0;

    //         // 1) followin mode - pushing
    //         rs.on('data', chunk => {
    //             size += chunk.length;
    //             n++;

    //             // var chunk = chunk.toString()
    //             // console.log(typeof chunk, chunk[chunk.length-1]);
    //             // console.log('read chunk: ', n);
    //             // console.log('read chunk: ', chunk.toString());
    //         });

    //         rs.on('end', () => {
    //             // stream emits an end event.
    //             console.log(`file size: `, this.filesize(size));
    //             resolve(`file size: ${this.filesize(size)}`);
    //         });
    //     });
    // }

    makeABigFile(n) {
        return new Promise((resolve, reject) => {
            var writerStream = fs.createWriteStream(this.file);

            for (var i = 0; i < n; i++) {
                let str = _Func.generatePassword(128);
                writerStream.write(str + "\n");
            }

            writerStream.end();

            writerStream.on('finish', function () {
                console.log("Write completed.");
                resolve(i);
            });

            writerStream.on('error', function (err) {
                console.log(err.stack);
                reject(err);
            });
        });
    }

    CSVtoArray(text) {
        var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
        var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;

        if (!re_valid.test(text)){
            return null;
        }

        var a = [];
        text.replace(re_value, function (m0, m1, m2, m3) {
            if (m1 !== undefined){
                a.push(m1.replace(/\\'/g, "'"));
            }
            else if (m2 !== undefined) {
                a.push(m2.replace(/\\"/g, '"'));
            }
            else if (m3 !== undefined){
                a.push(m3);
            }

            return '';
        });

        if (/,\s*$/.test(text)){
            a.push('');
        }

        return a;
    }

}



module.exports = ipLookup.getInstance();
