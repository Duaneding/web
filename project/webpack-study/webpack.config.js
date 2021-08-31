const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')
const TxtPlugin = require('./MyPlugins/my-plugin')

module.exports = {
    entry:{
        /**
         * chunk 代码片段
         * chunkName 代码片段的名称
         * chunks chunk组
         * 例如first组包含a(chunk) b(chunk) 这样两个chunk
         * 
         * bundle   打包完成后生成的文件  包含自执行函数和chunks
         * */ 
        first:'./src/a.js',
        last:'./src/a.js',
        main:'./src/a.js'
    },// string | array | object
    output:{
        path:path.resolve(__dirname,'./build'),
        filename:'js/[name].js', //入口文件的key
        // publicPath:'http://www.baicu.com/asset'  //引用位置
    },
    mode:'development',// production | development | none
    //默认只支持js json模块(js json语法)
    resolveLoader:{
        modules:['./node_modules','./MyLoader']
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                use:{
                    loader:'vue-loader',
                    options:{}
                }
                
            },
            {
                test:/\.css$/,
                use:[{
                    loader:'my-style-loader',
                    options:{}
                },'my-css-loader'], //自后向前执行
            },
            {
                test:/\.less$/,
                use:[MiniCssExtractPlugin.loader,'css-loader','postcss-loader','less-loader'], //自后向前执行
            },
            {
                test:/\.js$/,
                use:[
                    {loader:'replace-async-loader',},
                    {
                        loader:'replace-loader',
                        options:{
                            name:'dr'
                        }
                    },
                ]
            },
            {
                test:/\.(?:png|jpe?p|gif|webp)$/,
                use:{
                    loader:'url-loader',   // file-loader的扩展，依赖file-loader
                    options:{
                        name:'[name].[ext]',
                        outputPath:'images', //决定图片存放位置
                        publicPath:'../images', //决定图片引用位置
                        limit:3 * 1024,    // 推荐3kb
                    }
                }
            },
            {
                test:/\.(?:woff|woff2)$/,
                use:{
                    loader:'file-loader',   // file-loader的扩展，依赖file-loader
                    options:{
                        name:'[name].[ext]',
                        outputPath:'font', 
                        publicPath:'../font', 
                    }
                }
            },
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    // options:{
                    //     //es2015+处理成es2015
                    //     //注意是否配置了目标浏览器集合
                    //     presets:[
                    //         [
                    //             '@babel/preset-env',
                    //             {
                    //                 targets:{
                    //                     edge:'17',
                    //                     // browsers: [">1%", "last 2 version"]
                    //                 },
                    //                 corejs:'3',
                    //                 //按需引入垫片
                    //                 useBuiltIns:'entry', //usage | entry | false
                    //             }
                    //         ]
                    //     ]
                    // }
                }
            }

    ]
    },
    plugins:[
        
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        //css抽离为单独文件
        new MiniCssExtractPlugin({
            filename:'style/[name].css',
        }),
        new htmlWebpackPlugin({
            template:'./src/index.html',
            filename:'first.html',
            chunks:['first']
        }),
        new htmlWebpackPlugin({
            template:'./src/index.html',
            filename:'last.html',
            chunks:['last']
        }),
        new htmlWebpackPlugin({
            template:'./src/index.html',
            filename:'main.html',
            chunks:['main']
        }),
        new TxtPlugin(),
        

    ], //所有的插件内部都必须指明执行时机，可以控制打包流程
}