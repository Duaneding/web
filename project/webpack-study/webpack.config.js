const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
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
        filename:'[name].js' //入口文件的key
    },
    mode:'development',// production | development | none
    plugins:[
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
        })
    ], //所有的插件都必须指明执行时机，可以控制打包流程
}