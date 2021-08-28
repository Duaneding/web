/**
 * 查看所有webpack完整配置指令     vue inspect
 * vue inspect --rules
 * vue inspect --rule svg
 * */ 
const path = require('path');
const resolve = (dir) => path.join(__dirname,dir);
let port = 7000;

module.exports = {
    publicPath:'/best-practice',
    devServer:{
        port
    },
    // configureWebpack:{
    //     resolve:{
    //         alias:{
    //             comps:path.join(__dirname,'src/components')
    //         }
    //     }
    // },
    // configureWebpack(config){
    //     config.resolve.alias.comps = path.join(__dirname,'src/components');
    //     if(process.env.NODE_ENV === 'development'){
    //         config.name = '开发版本'
    //     }else{
    //         config.name = '生产版本'
    //     }
    // },
    chainWebpack(config){
        /**
         * svg图片icon加载：svg-sprite-loader
         * 项目有默认的svg loader处理，排除掉目标目录
        */
        config.module.rule('svg').exclude.add(resolve('src/icons'))
        /**
         * 添加svg-sprite-loader，仅作用于我们自己的目录
         * */ 
         config.module.rule('icons')
            .test(/\.(svg)(\?.*)?$/)
            .include.add(resolve('src/icons')).end()
            .use('svg-sprite-loader')
                .loader('svg-sprite-loader')
                .options({symbolId:'icon-[name]'})
    }
}