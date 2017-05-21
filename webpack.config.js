const path = require('path');

module.exports = {
	entry: ['babel-polyfill', './static/js/index.jsx'],
	output: {
		path: path.resolve(__dirname, 'static/js/dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{test: /\.(js|jsx)$/, use: 'babel-loader'}
		]
	}
};
