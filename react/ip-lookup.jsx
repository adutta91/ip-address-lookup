const React  = require('react');
const config = require('../config.public.js')

const Base = require('./base.jsx')

class IpLookup extends Base {
    constructor(props) {
        super(props)
    }

    componentDidUpdate(){

    }

    showLookupBox(){
        let stack =[]

        stack.push (
            <form className="card p-2 mt-5">
                <div className="input-group">
                    <input type="text" className="form-control search-input-box" placeholder="Enter IP Address. Ex. 200.132.1.99" />
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
            <header className="masthead mb-5">
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
