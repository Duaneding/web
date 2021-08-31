//loader就是一个函数，但是不能是箭头函数
//必须有返回值
//api挂载在this上
module.exports = function(source){
    //source是一个buffer或字符串
    // return source.replace('heesss',this.query.name)

    /**
     * callback自己返回值，支持异步
     * params{
        err: Error | null,
        content: string | Buffer,
        sourceMap?: SourceMap,
        meta?: any
     * }
     * 
     * */ 
    const content = source.replace('heesss',this.query.name);
    this.callback(null,content)
    
}