/**
 * 1.创建style标签，插入content
 * 2.style插入head标签
 * 
 * 
*/
module.exports = function(source){
    return `
        const tag = document.createElement('style');
        tag.innerHTML = ${source};
        document.head.appendChild(tag);
        alert(1)
    `
}