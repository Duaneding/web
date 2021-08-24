const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const nodeExternals = require('webpack-node-externals');
const merge = require('lodash.merge')


const TARGET_NODE = process.env.WEBPACK_TARGET === "node";
const target = TARGET_NODE ? "server" : "client";

module.exports = {
  css:{
    extract:false,
  },
  outputDir:'./dist/' + target,
  configureWebpack: () => ({
    entry:'./src/entry-' + target +'.js',
    //对bundle renderer 提供 source map 支持
    devtool:'source-map',
    //设置target的值告知webpack是否以node的方式处理动态导入
    //并且在编译组件时告知vue-loader输出面向服务器的代码
    target:TARGET_NODE ? 'node' : 'web',
    //是否模拟node全局变量
    node:TARGET_NODE ? undefined : false,
    output:{
      //导出代码的风格
      libraryTarget:TARGET_NODE ? "commonjs2":undefined,
    },
    // https://webpack.js.org/configuration/externals/#function
    // https://github.com/liady/webpack-node-externals
    // 外置化应用程序依赖模块。可以使服务器构建速度更快，并生成较小的打包文件
    externals:TARGET_NODE 
      ? nodeExternals({
        /**
         * 不要外置化webpack需要处理的依赖模块
         * 可以添加更多的文件类型，比如*.vue文件
         * 还应该将修改global（例如polyfill）的依赖模块列入白名单
         * */ 
        allowlist:[/\.css$/]
      }) 
      : undefined,
    optimization:{
      splitChunks:undefined,
    },
    /**
     * 将服务器整个输出构建为单个json文件的插件。
     * 服务端默认文件名为，vue-ssr-server-bundle.json
     * 客户端默认文件名为，vue-ssr-client-bundle.json
     * **/ 
    plugins:[TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()]
  }),
  chainWebpack: config => {
    //cli4项目添加
    if(TARGET_NODE){
      config.optimization.delete('splitChunks')
    }
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        merge(options,{
          optimizeSSR:false
        });
      });
  }
}