const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
	entry: ['babel-polyfill','./src/app.js'],
	output: {
		filename: 'js/main.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"windows.jQuery": "jquery"
		}),
		new CleanWebpackPlugin(['dist'])
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [{
					loader: 'babel-loader'
				}]/*,
				exclude: [path.resolve(__dirname, 'node_modules')]*/
			},
			{
				test: /\.css$/,
				use: ['style-loader','css-loader'],
			},
			{
				test: /\.(jpg|png|gif)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 8192,
						name: 'img/[name]_[hash:8].[ext]'
					}
				}]
			}
		]
	},
	devServer: {
		open: true,
		port: 8800
	},
	resolve: {
		modules: [
			'node_modules',
            path.resolve(__dirname,'src')
		]
	}
}