const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const glob = require('glob')
const setMPA = () => {
    const entry_set = {}
    const htmlWebpackPlugin_set = []
    const entryPath = glob.sync(path.resolve(__dirname,'src/js/entry/*/index.js'))
    entryPath.forEach(str => {
        const chunkName = str.match(/src\/js\/entry\/(.*)\/index\.js/)[1];
        entry_set[chunkName] = str;
        htmlWebpackPlugin_set.push(new htmlWebpackPlugin({
            template:path.resolve(__dirname,'./src/template/index.html') ,
            filename:`${chunkName}.html`,
            chunks:[chunkName]
        }))
    })
    return {
        entry_set,
        htmlWebpackPlugin_set
    }
}
const {entry_set,htmlWebpackPlugin_set} = setMPA();
module.exports = {
    entry:entry_set,// string | array | object
    output:{
        path:path.resolve(__dirname,'./map-dist'),
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
                    loader:'url-loader',   // file-loader的扩展，依赖file-loader
                    options:{
                        name:'[name].[ext]',
                        outputPath:'font', 
                        publicPath:'../font', 
                        limit:3 * 1024,
                    }
                }
            }

    ]
    },
    plugins:[
        //css抽离为单独文件
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename:'style/[name].css',
        }),
        ...htmlWebpackPlugin_set
        

    ], //所有的插件内部都必须指明执行时机，可以控制打包流程
}