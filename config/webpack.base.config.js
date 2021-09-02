const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const srcPath = path.resolve(process.cwd(), 'src');
const isProduction = process.env.NODE_ENV === 'production';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');


module.exports = {
    mode: process.env.NODE_ENV,
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [srcPath],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: isProduction ? '/[path][name].[ext]' : '[path][name].[ext]',
                            context: srcPath
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name:  isProduction ? '/[name].[ext]' : '[name].[ext]',
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: !isProduction } },
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer]
                        }
                    },
                    'sass-loader',
                ],
            },
        ]
    },
    plugins: (isProduction ? 
        [
            new MiniCssExtractPlugin({
                filename: '[name].css',
            }),
            new VueLoaderPlugin()
        ] : [
            new MiniCssExtractPlugin({
                filename: '[name].css',
                hmr: true,
            }),
            new VueLoaderPlugin()
        ]
    )
};