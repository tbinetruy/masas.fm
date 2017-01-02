//var path = require('path')
var webpack = require('webpack')

console.log(__dirname + '/static/js')
module.exports = {
	entry:  __dirname + '/static/js/index.jsx',
	output: {
		path:     __dirname + 'static/js/builds',
		filename: 'bundle.js',
	},
	module: {
		loaders: [
			{
				test: /\.jsx?/,
				loader: 'babel',
				exclude: __dirname + '/node_modules',
				include: __dirname + '/static/js' 
			}
		 ],
	}
};
