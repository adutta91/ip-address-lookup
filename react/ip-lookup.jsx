const React  = require('react');
const config = require('../config.public.js')

const Base = require('./base.jsx')

class IpLookup extends Base {
    constructor(props) {
        super(props)
    }

    componentDidUpdate(){

    }

    render(){
        return (
            <div>Hello!</div>
        )
    }


}

module.exports = IpLookup
