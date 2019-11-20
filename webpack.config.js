var path = require('path');
var webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    module: {
        rules: [
            {
                test   :/\.(js|jsx)$/,
                exclude:/(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: require.resolve("file-loader") + "?name=../static/media/[name].[ext]"
            },
            {
                test: /\.scss$/,
                use: [
                  "style-loader",
                  "css-loader",
                  "sass-loader"
                ]
            },
            {
              test: /\.html$/,
              use: [
                {
                  loader: "html-loader"
                }
              ]
            }
        ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./public/index.html",
        filename: "./index.html"
      })
    ]
}