
const BaseClass = require('./base.class.js');

/**
 *  Class of array based Priority Queue
 */
class PriorityQueue extends BaseClass {
    // length()     // Return the count of elements in Q.
    // isEmpty()    // Return true if Q is empty and false otherwise.
    // enqueue(symbol, priority)  // Insert a new element ele into Q.
    // min()        // Return a reference of the smallest element in Q.
    // removeMin()  // Remove the smallest element from Q.

    constructor(){
        super()

        this.queue = [];
    }

    length(){
        return this.queue.length
    }
    
    isEmpty(){
        return this.queue.length == 0
    }
    
    enqueue(symbol, priority){
        var element = {symbol, priority}
        var inserted = false;
    
        for (let index = 0; index < this.queue.length; index++) {
            if(this.queue[index].priority > element.priority){
                this.queue.splice(index, 0, element);
                inserted = true;
                break;
            }
        }
    
        if(!inserted){
            this.queue.push(element); // push/enqueue to the end of queue
        }
    }
    
    min(){
        return this.queue[this.queue.length - 1]
    }

    removeMin(){
        this.queue.pop()
    }

}



module.exports = PriorityQueue 