const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');
const DotEnv = require('dotenv-webpack');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const dotenvConfig = { systemvars: true };
dotenvConfig.path = path.join(__dirname, '.env');

module.exports = {
    mode: 'development',
    entry: ['babel-polyfill', path.join(__dirname, 'server', 'server.ts')],
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'server.js',
        pathinfo: false,
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                // Include ts, tsx, js, and jsx files.
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
    target: 'node',
    externals: [nodeExternals()],
    plugins: [
        new DotEnv(dotenvConfig),
        new CleanWebpackPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new NodemonPlugin(),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
};
