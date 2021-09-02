const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const isProduction = process.env.NODE_ENV === 'production';
const srcPath = path.resolve(process.cwd(), 'src');
const webpack = require('webpack');

module.exports = merge(base, {
    entry: {
        app: path.join(srcPath, './client-entry.js')
    },
    output: {
        path: path.resolve(process.cwd(), 'dist'),
        publicPath: '/dist',
        filename: '[name].js',
        sourceMapFilename: '[name].js.map',
    },
    resolve: {
        extensions: ['.js', '.vue'],
    },
    plugins: (isProduction ? 
        [] : [
            new webpack.HotModuleReplacementPlugin(),
        ]
    ) 
});