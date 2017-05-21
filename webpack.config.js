const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
	filename: 'sass.css',
	// disable: process.env.NODE_ENV === 'development'
});

module.exports = {
	entry: ['babel-polyfill', './static/js/index.jsx', './static/sass/main.sass'],
	output: {
		path: path.resolve(__dirname, 'static/dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader'
			},
			{
				test: /\.sass$/,
				use: extractSass.extract({
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
		extractSass
	]
};
// sassLoader: {
//     sourceMap: true
//   },
