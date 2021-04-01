const path = require("path");
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = (process.env.NODE_ENV === 'development');
let entry = ['./src/index.js'];

if (isDev) {
    // Refresh the page with a 2sec interval
    const clientConfig = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true';
    entry.push(clientConfig);
}

module.exports = {
    devtool: 'source-map',
    entry,
    mode: process.env.NODE_ENV,
    output: {
        path: path.join(__dirname, '/public'),
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.(s*)css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|gif|jpg|svg)$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        isDev ? new webpack.HotModuleReplacementPlugin() : () => { },
        new Dotenv(),
        new HtmlWebPackPlugin({
            hash: true,
            filename: "index.html",  // Target HTML
            template: "./src/index.html", // Source HTML
            favicon: "./src/components/Favicon.svg" // Favicon
        }),
        new MiniCssExtractPlugin({
            filename: 'app.css'
        })
    ]
}