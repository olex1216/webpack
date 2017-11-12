const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// const manifest = require('./lib/manifest.json');

module.exports = {
	devtool: 'eval-source-map',
	entry: {
		index: __dirname + "/app/main.js",
		vendor: [
			'react',
			'react-dom'
		]
	}, //业务代码与第三方库代码分离
	output: {
		path: __dirname + "/dev/", //打包后的文件存放的地方
		filename: "js/[name].chunk.js" ,//打包后输出文件的文件名

	},
	devServer: {
		contentBase: "./dev", //本地服务器所加载的页面所在的目录
		historyApiFallback: true, //不跳转
		inline: true, //实时刷新,
		hot: true,
	},
	module: {
		rules: [{
				test: /(\.jsx|\.js)$/,
				use: {
					loader: "babel-loader",

				},
				exclude: /node_modules/
			}, {
				test: /\.css$/,
				use: [{
					loader: "style-loader"
				}, {
					loader: "css-loader",
					options: {
						modules: true
					}
				}, {
					loader: "postcss-loader"
				}]
			}


		]
	},
	plugins: [
		new webpack.BannerPlugin('版权所有，翻版必究'),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: __dirname + "/app/index.tmpl.html" //new 一个这个插件的实例，并传入相关的参数
		}),
		new webpack.HotModuleReplacementPlugin(), //热加载插件
		new webpack.optimize.CommonsChunkPlugin(['vendor','mainfest']),
		new ExtractTextPlugin("style.css", {
    allChunks : true // 若要按需加载 CSS 则请注释掉该行
  }),
		// new webpack.DllReferencePlugin({
		// 	manifest: require(__dirname+'/build/lib/manifest.json'),
		// 	context: __dirname,
		// })


	],


}