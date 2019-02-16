/*jshint esversion: 6 */

const React  = require('react');
const config = require('../config.public.js')

const Base = require('./base.jsx')

class IpLookup extends Base {
    constructor(props) {
        super(props)

        this.state = {
            ipAddress: 123
        }
    }

    componentDidUpdate(){

    }

    changeIp(e){
        this.setState({ipAddress: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault();

        let params = {
            ip: this.state.ipAddress
        };

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        };

        fetch(config.url.lookup, options)
        .then(res=>{
            return res.json();
        })
        .then(result=>{
            console.log(result);            
        })
    }

    showLookupBox(){
        let stack =[]

        stack.push (
            <form className="card p-2" onSubmit={ this.handleSubmit.bind(this) } >
                <div className="input-group">
                    <input type="text" className="form-control search-input-box" placeholder="Enter an IP Address. Ex. 1.12.123.2" 
                           value={this.state.ipAddress} onChange={this.changeIp.bind(this) } />
                    <div className="input-group-append">
                        <button type="submit" className="btn btn-secondary">Search</button>
                    </div>
                </div>
            </form>
        )

        stack.push(
            <div className="input-group text-color-secondary p2">
                <label className="small">IPv4 address only.</label>
            </div>
        )

        return stack
    }

    render(){
        let stack = []
        stack.push (
            <header className="masthead mb-auto">
                <div className="inner">
                    <h3 className="masthead-brand">IP Address Lookup</h3>
                    <nav className="nav nav-masthead justify-content-center">
                        <a className="nav-link active" href="#">Home</a>
                    </nav>
                </div>
            </header>
        )

        stack.push (
            <main role="main" className="inner cover">
                {this.showLookupBox()}
            </main>
        )

        stack.push (
            <footer className="mastfoot mt-auto">
                <div className="inner">
                    <p>Lookup physical location of IP address, by <a href="https://github.com/baybird">@baybird</a>.</p>
                </div>
            </footer>
        )

        return stack
    }


}

module.exports = IpLookup
