const {merge} = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.config.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HandlebarsPlugin = require('handlebars-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devWebpackConfig = merge(baseConfig, {
    mode: 'development',
    devtool: "source-map",
    devServer: {
        index: 'en.html',
        contentBase: './dist',
        overlay: {
            warnings: true,
            errors: true
        }
    },
    plugins: [
        new MiniCssExtractPlugin({filename: 'styles.css'}),
        new HandlebarsPlugin({
            entry: path.join(__dirname, "src", "views", "index.html"),
            output: path.join(__dirname, "tmp", "ru.html"),
            data: require("./src/store/ru")
        }),
        new HandlebarsPlugin({
            entry: path.join(__dirname, "src", "views", "index.html"),
            output: path.join(__dirname, "tmp", "en.html"),
            data: require("./src/store/en")
        }),
        new HtmlWebpackPlugin({
            template: './tmp/ru.html',
            filename: 'ru.html'
        }),
        new HtmlWebpackPlugin({
            template: './tmp/en.html',
            filename: 'en.html'
        }),
        new CopyPlugin({
            patterns: [{from: './src/assets/img', to: './assets/img'}]
        })
    ]
});

module.exports = new Promise((resolve) => {
    resolve(devWebpackConfig);
});
