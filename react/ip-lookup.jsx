/*jshint esversion: 6 */

const React  = require('react');
const config = require('../config.public.js');

const Base = require('./base.jsx');
const _Func  = require("../libs/functions.js");

class IpLookup extends Base {
    constructor(props) {
        super(props);

        this.state = {
            ipAddress: '73.254.88.197'
        };
    }

    componentDidUpdate(){

    }

    changeIp(e){
        this.setState({ipAddress: e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();

        if(this.state.ipAddress){
            var params = {
                ip: this.state.ipAddress
            };

            this.httpPost(config.url.lookup, params)
            .then(res=>{
                let result = this.handleResponse(res);
                this.setState({result})
            }).catch(res=>{
                let error = this.handelError(res);
                this.setState({error});
            });
        }
        else{
            this.setState({error: `Please enter an IP address.`});            
        }        

    }

    showLookupBox(){
        let stack =[];

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
