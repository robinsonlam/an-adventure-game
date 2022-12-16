const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
module.exports = {
    entry: './src/index',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].bundle.js'
        
    },
    resolve: {
        alias: {
            'node_modules': path.join(__dirname, 'node_modules'),
            '@assets': path.join(__dirname, '../src/assets'),
            '@prefabs': path.join(__dirname, '../src/prefabs')
        }
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                {
                    loader: 'file-loader',
                },
                ],
            },
        ],
    },
    optimization: {
        runtimeChunk: 'single',
    },
};