const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    devtool: 'none',
    entry: {
        index: __dirname + "/app/main.js",//已多次提及的唯一入口文件
        vendor: [
            'react',
            'react-dom'
        ]
    }, //业务代码与第三方库代码分离
    output: {
        path: __dirname + "/dist/", //打包后的文件存放的地方
        filename: "js/[name]-[chunkhash:5].js", //打包后输出文件的文件名
        // chunkFilename:"[name].[chunkhash:6].chunk.js"
    },
    devServer: {
        contentBase: "./dist", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新,
        hot: true,
    },
    module: {
        rules: [{
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                            loader: "style-loader"
                        },
                        {
                            loader: "css-loader",
                            options: {
                                // modules: true
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: function() {
                                    return [
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: __dirname + "/app/index.tmpl.html" //new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin(['vendor','mainfest']),
        // new webpack.optimize.CommonsChunkPlugin({name:'vendor'}),
        // new webpack.optimize.CommonsChunkPlugin({name:'mainfest'}),
        // new webpack.HotModuleReplacementPlugin(), //热加载插件
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("style.css", {
            allChunks: true 
        }),
    ]
}