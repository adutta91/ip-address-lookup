const express      = require('express')
const app          = express();
const path         = require('path')
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser')
const parseurl     = require('parseurl')

const config       = require('./config.public.js')
const logger       = require("./libs/log/logger.js")

process.on('uncaughtException', (err, req, res, next) => {
    logger.system.error(err)
    console.log('Error caught in uncaughtException event', err)
    // res.send('Error caught in uncaughtException event', err)
})
require('babel-core/register')({
    presets: ['es2015', 'react']
});


// session
// var session = require('express-session')
// var sessionStore = new MySQLStore(dbConfig);
// app.use(session({
//     key              : 'session_cookie_name',
//     secret           : 'session_cookie_secret',
//     store            : sessionStore,
//     resave           : true,
//     saveUninitialized: true,
//     cookie: {
//         httpOnly: true,
//         maxAge  : config.session.maxAge
//     },
//     rolling: true
// }));

app.use(cookieParser())

// Parse incoming request bodies in a middleware before your
// handlers, available under the req.body property.
app.use(bodyParser.json()); // parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // parsing application/x-www-form-urlencoded


// template engine - ejs
const ejs = require('ejs')
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public'), {
    // maxage: 86400000, /* 1 day */
}))


// routers
const index = require('./routes/index.js');
const api   = require('./routes/api.js');
app.use(index);
app.use(api)

app.listen(config.port, config.host, ()=>{
    console.log(`Listen on ${config.host}:${config.port}`);
});
