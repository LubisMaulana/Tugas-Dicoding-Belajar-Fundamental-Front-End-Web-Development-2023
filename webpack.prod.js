/* eslint-disable no-undef */
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
	mode:'production',
	module: {
		rules: [{
			test: /\.js$/,
			use: [{
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env']
				}
			}]
		}]
	},
	optimization: {
		minimize: true,
		minimizer: [
			new HtmlMinimizerPlugin({
				minify: HtmlMinimizerPlugin.swcMinify,
				minimizerOptions: {}
			}),
		],
	},
	plugins: [
		new miniCssExtractPlugin()
	]
});