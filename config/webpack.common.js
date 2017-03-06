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
        extensions: [".ts", ".js", ".scss", ".css", ".html"]
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ["awesome-typescript-loader", "angular2-template-loader?keepUrl=true"],
                exclude: [/\.(spec|e2e)\.ts$/]
            },
            {
                test: /\.html$/,
                use: "html-loader"
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                use: "file-loader?name=assets/[name].[hash].[ext]"
            },
            {
                test: /\.global\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: ["css-loader", "sass-loader?sourceMap"]
                }),
            },
            {
                test: /\.scss$/,
                exclude: [/\.global\.scss$/],
                use: ["raw-loader", "sass-loader"]
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
                from: "public",
                ignore: ["public-readme.txt"]
            }
        ])
    ]
};
