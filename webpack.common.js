/* eslint-disable no-undef */
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		main: './src/js/index.js',
		DetailResto: './src/js/component/DetailResto.js',
		Navbar: './src/js/component/navbar.js',
		NewsItem: './src/js/component/NewsItem.js',
		NewsList: './src/js/component/NewsList.js',
		ReviewItem: './src/js/component/ReviewItem.js',
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
	plugins: [
		new HtmlWebpackPlugin({ template: './index.html' }),
	],
	module: {
		rules: [{
			test: /\.(scss)$/,
			use: [
				{
					loader: 'style-loader'
				},
				{
					loader: 'css-loader'
				},
				{
					loader: 'postcss-loader',
					options: {
						postcssOptions: {
							plugins: [
								autoprefixer
							]
						}
					}
				},
				{
					loader: 'sass-loader'
				}
			]
		}, {
			test: /\.css$/i,
			exclude: /styles/,
			use: ['to-string-loader', 'css-loader']
		}]
	}
};