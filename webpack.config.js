const path = require("path");
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Refresh the page with a 2sec interval
const clientConfig = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true';

module.exports = {
    devtool: 'source-map',
    entry: ['./src/index.js', clientConfig],
    mode: 'development',
    output: {
        path: path.join(__dirname, "/public"),
        filename: "index_bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
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
                test: /\.(png|gif|jpg)$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebPackPlugin({
            hash: true,
            filename: "index.html",  // Target HTML
            template: "./src/index.html" // Source HTML
        }),
        new MiniCssExtractPlugin()
    ]
}