const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSassDev = new ExtractTextPlugin({
	filename: 'sass.css',
	// disable: process.env.NODE_ENV === 'development'
});

const devConfig = {
	entry: ['babel-polyfill', './static/js/index.jsx', './static/sass/main.sass'],
	output: {
		path: path.resolve(__dirname, 'static/dist'),
		filename: 'bundle.js'
	},
	devtool: 'source-map',
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
		extractSassDev
	]
}


module.exports = devConfig