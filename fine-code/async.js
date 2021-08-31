async function fn(){
    console.log(11);
    await new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log(22);
            resolve()
        },2000)
    })
    console.log(33);
}
console.log(1);
console.log(2);
fn();

console.log(3);
console.log(4);