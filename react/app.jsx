const React         = require('react');
const ReactDOM      = require('react-dom');

// const BrowserRouter = require("react-router-dom").BrowserRouter
// const Switch        = require("react-router-dom").Switch
// const Route         = require("react-router-dom").Route
// const NavLink       = require("react-router-dom").NavLink

const IpLookup = require('./ip-lookup.jsx')

ReactDOM.render(<IpLookup />, document.getElementById('app'));
