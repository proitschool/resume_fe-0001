const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HandlebarsPlugin = require('handlebars-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        index: 'en.html',
        contentBase: './dist',
        overlay: {
            warnings: true,
            errors: true
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: './assets/fonts/[name].[ext]',
                    }
                }]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({filename: 'styles.css'}),
        new HandlebarsPlugin({
            entry: path.join(__dirname, "src", "views", "index.html"),
            output: path.join(__dirname, "tmp", "ru.html"),
            data: require("./src/i18n/ru")
        }),
        new HandlebarsPlugin({
            entry: path.join(__dirname, "src", "views", "index.html"),
            output: path.join(__dirname, "tmp", "en.html"),
            data: require("./src/i18n/en")
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
    ],
};