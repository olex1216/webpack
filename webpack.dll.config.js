const webpack = require('webpack');
module.exports = {
	entry: {
		vendor: [
			'react',
			'react-dom'
		]
	},
	output: {
		path: __dirname + '/build/lib',
		filename: '[name].dll.js',
		library: '[name]_lib',
	},
	plugins: [
		new webpack.DllPlugin({
			path: __dirname + '/build/lib/manifest.json',
			name: '[name]_lib',
			context: __dirname,
		}),
	],
}