module.exports = function(source){
    /**
     * callback自己返回值
     * callback支持异步异步,但必须明确调用声明
     * params{
        err: Error | null,
        content: string | Buffer,
        sourceMap?: SourceMap,
        meta?: any
     * }
     * 
     * */ 
    const content = source.replace('hello','dingran');
    this.async();
    setTimeout(() => {
        this.callback(null,content)
    },2000)
}