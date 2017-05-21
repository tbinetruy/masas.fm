const path = require('path');
const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const extractSassDev = new ExtractTextPlugin({
	filename: 'sass.css',
	// disable: process.env.NODE_ENV === 'development'
});

const devConfig = {
	entry: [
		'react-hot-loader/patch',
		// activate HMR for React

		'webpack-dev-server/client?http://localhost:8080',
		// bundle the client for webpack-dev-server
		// and connect to the provided endpoint

		'webpack/hot/only-dev-server',
		// bundle the client for hot reloading
		// only- means to only hot reload for successful updates

		'babel-polyfill',

		'./static/js/index.jsx',
		// js entry point

		'./static/sass/main.sass'
		// sass entry point
	],
	output: {
		path: path.resolve(__dirname, 'static/dist'),
		filename: 'bundle.a.js',
		// bundle output

		publicPath: 'http://localhost:8080/static/dist'
		// necessary for HMR to know where to load the hot update chunks
	},
	devtool: 'source-map',
	devServer: {
		hot: true,
		// enable HMR on the server

		contentBase: resolve(__dirname, 'dist'),
		// match the output path

		publicPath: 'http://localhost:8080/static/dist',
		// match the output `publicPath`

		headers: {
			'Access-Control-Allow-Origin': 'http://localhost:8000',
			'Access-Control-Allow-Credentials': 'true'
		}
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader'
			},
			{
				test: /\.sass$/,
				use: extractSassDev.extract({
					use: [
						{
							loader: 'css-loader?url=false&sourceMap'
						},
						{
							loader: 'sass-loader'
						}
					]
				})
			},
		]
	},
	plugins: [
		extractSassDev,
		new webpack.HotModuleReplacementPlugin(),
		// enable HMR globally

		new webpack.NamedModulesPlugin(),
		// prints more readable module names in the browser console on HMR updates
	]
}


module.exports = devConfig