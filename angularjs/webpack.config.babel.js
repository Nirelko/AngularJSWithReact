import HtmlWebpackPlugin from 'html-webpack-plugin';
import { ExternalsPlugin } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import path from 'path';

const distPath = path.join(__dirname, './dist');

export default {
    entry: path.join(__dirname, './src/app.js'),
	output: {
		path: distPath,
		filename: '[name].[hash].js'
	},
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.html$/,
                loader: ['html-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ExternalsPlugin('commonjs'),
        new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			inject: 'body'
		})
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    optimization: {
        noEmitOnErrors: true
    },
    mode: process.env.NODE_ENV,
    devServer: {
        contentBase: distPath,
        hot: true,
        historyApiFallback: true
    },
    devtool: 'source-map'
};