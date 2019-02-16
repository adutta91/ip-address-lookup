/*jshint esversion: 6 */

var assert = require('assert');
// var expect = require('expect');

describe("IP class", ()=>{
    var _Ip = require("../libs/ip.class.js");

    const ipAddress = '202.186.13.4'
    const ipNum = 3401190660;

    describe("Convert IP address to IP number", ()=>{
        it(`IP Address ${ipAddress} shoud convert to IP number ${ipNum}.`, (done)=>{
            var result = _Ip.address2Number(ipAddress)
            assert.equal(result, ipNum)
            done()
        })// end it
    })

    describe("Convert IP number to IP address", ()=>{
        it(`IP number ${ipNum} should conver to IP address ${ipAddress}.`, (done)=>{
            var result = _Ip.number2Address(ipNum)
            assert.equal(result, ipAddress)
            done()
        })// end it
    })

    // describe("Make a big file", ()=>{
    //     const n = 6999999
    //     it(`It should wrtie ${n} lines to file.`, (done)=>{
    //         _Ip.makeABigFile(n).then(result=>{
    //             assert.equal(result, n)
    //             done()
    //         }).catch(error=>{
    //             done(error)
    //         })
    //     })// end it
    // })

    before(function(){
        
        describe("Load data from CSV file.", ()=>{
            // this.timeout(5000)            
    
            it(`Load data from CSV file.`, (done)=>{
                let n = 2903459;

                _Ip.loadData().then(result=>{
                    assert.equal(result, n);
                    done();
                }).catch(error=>{
                    done(error);
                });
            }); // end it
        });
        
    })

    describe("Searching IP", ()=>{
        var ipAddress = '73.254.88.197';

        it(`Address should be found for ${ipAddress}`, (done)=>{
            var item = _Ip.lookupIPAddress(ipAddress)

            if(item){
                console.log('found: ', item);
                assert.ok(true)
                done()
            }
            else{
                done('not found.')           
            }
        });// end it
    });

});
