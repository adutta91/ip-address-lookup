var assert = require('assert')
var expect = require('expect');
var http = require('http');

describe("IP class", ()=>{
    var _Ip = require("../libs/ip.class.js");

    const ipAddress = '202.186.13.4'
    const ipNum = 3401190660

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

});
