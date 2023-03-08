"use strict";

const path = require("path");
const webpack = require("webpack");

module.exports = {
    devtool: "inline-source-map",
    entry: [
        "webpack-dev-server/client?http://localhost:1337/",
        "./src/index.js"
    ],
    output: {
        path: path.join(process.cwd(), "dist"),
        filename: "bundle.js",
        publicPath: "/dist/"
    },
    resolve: {
        modules: [
            process.cwd(),
            "node_modules"
        ]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [
                    path.join(__dirname, "../../..", "src")
                ],
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [ [ "es2015", { "modules": false } ] ],
                            plugins: [
                                [ "transform-es2015-classes", { loose: true } ],
                                [ "babel-plugin-minify-replace", {
                                    "replacements": [
                                        {
                                            "identifierName": "VERSION",
                                            "replacement": {
                                                type: "StringLiteral",
                                                value: "DEV",
                                            }
                                        },
                                        {
                                            "identifierName": "__DEV__",
                                            "replacement": {
                                                type: "booleanLiteral",
                                                value: true
                                            }
                                        }
                                    ]
                                } ]
                            ]
                        }
                    }
                ],
            },
            {
                test: /\.(png|svg)$/,
                loader: "url-loader"
            },
            {
                test: /\.(css|less)$/,
                loader: "style-loader!css-loader!less-loader"
            }
        ]
    },
};
