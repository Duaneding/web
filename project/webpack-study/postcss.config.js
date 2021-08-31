module.exports = {
    //内部插件执行没有顺序
    plugins:[
        require("autoprefixer")({
            overrideBrowserslist:["last 1 version","> 1%"]
        }),
        require("cssnano")   //css文件压缩
    ]
}