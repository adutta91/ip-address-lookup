const webpack = require("webpack");
const path    = require("path");


const DIST_DIR = path.join(__dirname, "public/js/dist/"),
    CLIENT_DIR = path.join(__dirname, "react/");

module.exports = {
    entry: {
        "app.js"   : "./react/app.jsx"
    },
    output: {
        path: DIST_DIR,
        filename: "[name]"
    },
    module: {
        loaders: [
            {
                test: /\.js?/,
                include: path.join(__dirname, ''),
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css?/,
                loaders: ['style-loader', 'css-loader'],
            }
        ],
    },
    plugins: [new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        mangle  : true,
        debug: true,
        compress: {
            warnings    : false,
            screw_ie8   : true,
            conditionals: true,
            unused      : true,
            comparisons : true,
            sequences   : true,
            dead_code   : true,
            evaluate    : true,
            if_return   : true,
            join_vars   : true
        },
        output: {
            comments: false,
            beautify: true,
        }
    })],
    node: {
       fs: "empty"
    }
};
