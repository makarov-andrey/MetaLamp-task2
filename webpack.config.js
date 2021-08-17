const path = require('path');
const glob = require("glob");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PugIncludeGlob = require('pug-include-glob');

module.exports = function () {
    let plugins = [];

    let pages = glob.sync(__dirname + '/src/pages/*.pug');
    pages.forEach(function (file) {
        let base = path.basename(file, '.pug');
        plugins.push(
            new HtmlWebpackPlugin({
                filename: './' + base + '.html',
                template: './src/pages/' + base + '.pug',
                inject: true
            })
        )
    });

    return {
        entry: './src/ts/index.ts',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.pug$/,
                    loader: 'pug-loader',
                    options: {
                        plugins: [PugIncludeGlob()]
                    }
                },
                {
                    test: /(\.svg|\.jpe?g|\.png|\.gif)$/,
                    loader: 'file-loader',
                    options: {
                        name: 'assets/images/[path][name].[ext]',
                        limit: 10000
                    }
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader",
                    ],
                },
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'dist'),
        },
        plugins: plugins
    };
};
