const fs = require('fs');
// fs.readFile('a.txt',function(err,dataA){
//     if(err)console.log(err)
//     console.log(dataA.length < 2 ? dataA[0] : dataA)
//     fs.writeFile('d.txt',dataA,function(err){})
// })
//对f函数的回调结果封装为promise对象
function nfcall(f,...args){
    return new Promise(function(resolve,reject){
        f.call(null,...args,function(err,...args){
            if(err)return reject(err);
            resolve(args.length < 2 ? args[0] : args);
        })
    })
}

//封装迭代器,使其自动向下执行
function grun(g){
    const it = g();
    (function iterate(val){
        const x = it.next(val);
        if(!x.done){
            if(x.value instanceof Promise){
                x.value.then(iterate).catch(err => it.throw(err))
            }else{
                setTimeout(iterate,0,x.value)
            }
        }
    })()
}

//读取多个文件并合并
function* moreToOne(){
    const data = yield Promise.all([nfcall(fs.readFile,'a.txt'),nfcall(fs.readFile,'b.txt'),nfcall(fs.readFile,'c.txt')]);
    yield new Promise((resolve,reject) => {
        setTimeout(resolve,2000)
    })
    yield nfcall(fs.writeFile,'d.txt',data.reduce((a,b) => a+b));
}

grun(moreToOne)



/*
整数的千分位，更完善的工具库Numberal.js
Number.MAX_SAFE_INTEGER
Number.MIN_SAFE_INTEGER

Number.MAX_VALUE
Number.MIN_VALUE

Math.pow(2,53) - 1
*/
function splitWithComma(num){
    //校验合法性
    if(typeof num !== "number")throw new Error('请输入合法的数字或字符串')
    
    if(num >= Math.pow(2,53) || num <= -Math.pow(2,53))throw new Error('超出可处理数字范围')
    //分为整数和小数部分
    let pre = '';
    if(num < 0){
        pre = '-';
        num = num.toString().substring(1,);
    }
    let arr =  num.split('.');
    let inter = arr[0],float = arr[1];
    console.log(arr,float)
    //处理整数部分
   
    let inter_arr = inter.split(''),l = inter_arr.length;
    let n = Math.floor(inter_arr.length / 3);
    if(l <= 3*n)n--;

    for(let i = 1;i <= n;i++){
        inter_arr.splice(l - i * 3 - 1,1,inter_arr[l - i * 3 - 1],',')
    }
    //小数部分
    if(float > 0)float = '.'+float;
    //合并
    return pre + inter_arr.join('') + float;
}

function thousandthToNum(str){
    return 1 * str.split(',').join('');
}

let thousandthStr = splitWithComma(-643356596616.154);

let num = thousandthToNum(thousandthStr);
console.log(thousandthStr,num)



let s = '<i>siujddj</i>dddfdf<i>dkjfjhfhf</i>';
s.replace(/<i>.*<\/i>/ig,`<strong>$1</strong>`)