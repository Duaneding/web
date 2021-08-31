function compile(middlewares){
    return depth(0)
    function depth(i){
        const fn = middlewares[i]
        if(!fn)return Promise.resolve()
        return Promise.resolve(fn(function next(){
            depth(i + 1)
        }))
    }
}