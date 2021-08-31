
module.exports = class TxtPlugin{
    constructor(ops){

    }
    apply(compiler){
        //compiler , webpack执行时返回的对象
        //往emit钩子上注册事件，tap（同步），tapAsync（异步）
        //compilation,compiler当下的形态，异步事件特有参数
        compiler.hooks.emit.tapAsync("TxtPlugin",(compilation,callback) => {
            compilation.assets['dr.txt'] = {
                source:function(){return `内容`},
                size:function(){return 1024}
            }
            callback()
        }),
        compiler.hooks.emit.tapAsync("TxtPlugin",(compilation,callback) => {
            console.log(compilation.assets);

            let content = `打包文件清单：\n`,n = 0;
            for(let fileName in compilation.assets){
                content += `${fileName}\n`;
                n++
            }
            compilation.assets['list.txt'] = {
                source:function(){return `${content}\n文件数量：${n}`},
                size:function(){return 1024}
            }
            callback()
        })
    }
}