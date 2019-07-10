const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const DotEnv = require('dotenv-webpack');
var nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const dotenvConfig = { systemvars: true };
if (process.env.NODE_ENV !== 'production') {
    dotenvConfig.path = path.join(__dirname, '.env');
}

module.exports = {
    mode: 'production',
    entry: ['babel-polyfill', path.join(__dirname, 'server', 'server.ts')],
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'server.js',
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
    plugins: [new DotEnv(dotenvConfig), new CleanWebpackPlugin()],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
            }),
        ],
        splitChunks: {
            chunks: 'all',
        },
    },
};
