function addTimeout(fn,time){
    console.log(-2)
    if(time === undefined)time = 1000;
    return function(...args){
        return new Promise((resolve,reject) => {
            console.log(-1)
            const tid = setTimeout(reject,time,new Error('timeout'));
            console.log(0)
            setTimeout(() => {
                fn(...args)
                .then(function(...args){
                    clearTimeout(tid);
                    console.log(110)
                    resolve(...args);
                })
                .catch(function(...args){
                    clearTimeout(tid);
                    reject(...args);
                })
            },2000)
            
        })
       
    }
}

addTimeout(function(){ return new Promise((res) => {res(10)}) })()