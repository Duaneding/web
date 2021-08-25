function a(){
    b();
}
function b(){
    c();
}
function c(){
    throw new Error('c error');
}


function d(){
    c();
}


try {
    a()
} catch (error) {
    console.log(error.stack)
}

try {
    d()
} catch (error) {
    console.log(error.stack)
}

/**
 * 谷歌浏览器示例
 * Error: c error
    at c (<anonymous>:8:11)
    at b (<anonymous>:5:5)
    at a (<anonymous>:2:5)
    at <anonymous>:18:5

    
   Error: c error
    at c (<anonymous>:8:11)
    at d (<anonymous>:13:5)
    at <anonymous>:24:5

 * **/