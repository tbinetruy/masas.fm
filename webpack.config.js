const path = require('path');

module.exports = {
	entry: './static/js/index.jsx',
	output: {
		path: path.resolve(__dirname, 'static/js/dist'),
		filename: 'my-first-webpack.bundle.js'
	},
	module: {
		rules: [
			{test: /\.(js|jsx)$/, use: 'babel-loader'}
		]
  }
};
