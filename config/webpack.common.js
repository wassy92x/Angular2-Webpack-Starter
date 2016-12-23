var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var helpers = require("./helpers");

module.exports = {
    output: {
        path: helpers.root("dist")
    },

    entry: {
        "polyfills": "./src/polyfills.ts",
        "vendor": "./src/vendor.ts",
        "app": "./src/main.ts"
    },

    resolve: {
        extensions: ["", ".ts", ".js", ".scss", ".css", ".html"]
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ["awesome-typescript-loader", "angular2-template-loader"]
            },
            {
                test: /\.html$/,
                loader: "html"
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: "file?name=assets/[name].[hash].[ext]"
            },
            {
                test: /\.global\.scss$/,
                loader: ExtractTextPlugin.extract("css!sass?sourceMap"),
            },
            {
                test: /\.scss$/,
                exclude: [/\.global\.scss$/],
                loaders: ["raw-loader", "sass-loader"]
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ["app", "vendor", "polyfills"]
        }),

        new HtmlWebpackPlugin({
            template: "src/index.html"
        }),

        new CopyWebpackPlugin([
            {
                from: "public"
            }
        ])
    ]
};
