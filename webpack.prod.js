const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const extractSassProd = new ExtractTextPlugin({
	filename: 'sass.min.css',
});

const prodConfig = {
	entry: ['babel-polyfill', './static/js/index.jsx', './static/sass/main.sass'],
	output: {
		path: path.resolve(__dirname, 'static/dist'),
		filename: 'bundle.min.js',
		chunkFilename : '[name]-[id].js',
		publicPath: 'http://192.168.0.13:8000/static/dist/'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader'
			},
			{
				test: /\.sass$/,
				use: extractSassProd.extract({
					use: [
						{
							loader: 'css-loader?url=false'
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
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		}),
		new UglifyJSPlugin({
			beautify: false,
			mangle: {
				screw_ie8: true,
				keep_fnames: true
			},
			compress: {
				screw_ie8: true
			},
			comments: false
		}),
		extractSassProd,
	]
}

module.exports = prodConfig;