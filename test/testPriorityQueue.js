/*jshint esversion: 6 */

var assert = require('assert');
// var expect = require('expect');

const config = require("../config.public.js")

describe("Priority Queue class *******************", ()=>{
    var _PriorityQueue = require("../libs/priority-queue.class.js").getInstance();

    var ele = {symbol: 'a', priority: 99}

    it(`Insert an element to priority queue.`, (done)=>{
        _PriorityQueue.enqueue(ele)
        assert.ok(true)
        done()
    })// end it

    it(`Get the smallest element`, (done)=>{
        var result = _PriorityQueue.min()
        assert.ok(result === ele)
        done()
    })// end it

    describe("Test length() method.", ()=>{
        it(`The length should be 1.`, (done)=>{
            var result = _PriorityQueue.length()
            assert.ok(result === 1)
            done()
        })// end it
    });

    describe("Test removeMin() and isempty() method.", ()=>{
        it(`It should not be empty.`, (done)=>{
            var result = _PriorityQueue.isempty()
            assert.ok(result === false)
            done()
        })// end it

        it(`Remove smallest element from Q.`, (done)=>{
            try{
                _PriorityQueue.removeMin()
                assert.ok(true)
                done()
            }
            catch(err){
                assert.ok(false)
                done(err)
            }            
        })// end it

        it(`It should be empty now.`, (done)=>{
            var result = _PriorityQueue.isempty()
            assert.ok(result === true)
            done()
        })// end it
    });
});
