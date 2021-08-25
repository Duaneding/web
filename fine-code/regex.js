// let html = '<a class="ssss" href="/yep" style="height:10px">Yep</ a>';
// html = html.replace(/<a.*?(class=".*?").*?(href=".*?").*?>/,(...arg) => {
//     // console.log('$',arg[0]);
//     // console.log('$1',arg[1])
//     console.log('arg',arg);
//     return `<a ${arg[1]} ${arg[2]}>`
// })
// console.log(html)

html = '<a class="foo" href="/foo" idd="foo">Foo</a>\n' +
        '<A href="/foo" Class="foo">Foo</a>\n' +
        '<a href="/foo">Foo</a>\n' +
        '<a onclick="javascript:alert("foo!")">Foo</a>';
function sanitizeATag(aTag){

    const parts = aTag.match(/<a\s+(.*?)>(.*?)<\/a>/i);
    const attributes = parts[1].split(/\s+/);
    return '<a ' + attributes.filter(attr => /^(?:class|id|href)[\s=]/i.test(attr)).join(" ") + ">" + parts[2] + '</a>';
}

console.log(html.replace(/<a(.*?)<\/a>/ig,sanitizeATag),'\n-------');
// html.replace(/<a.*?<\/a>/ig,(m,gl,offset) => {
//     console.log('m:',m,'\ngl:',gl,'\noffset:',offset,'\n-----');
// })

//替换组
const input = "one two three";
console.log(input.replace(/two/,"($`)")); //前半部分
console.log(input.replace(/\w+/g,"($&)")); //自身
console.log(input.replace(/two/,"($')")); //后半部分
console.log(input.replace(/two/,"($$)")); //$符号
//单词边界匹配
/***
 * /\bcount/ 会找到count countdown
 * /count\b/ 会找到count account
 * /\bcount\b/ 会找到count
 *  */ 
function validPassword(p){
    return /[0-9]/.test(p) &&
        /[a-z]/.test(p) &&
        /[A-Z]/.test(p) &&
        !/[^0-9a-zA-Z]/.test(p)
    /**
     * /[A-Z.*0-9a-z]/.test(p)  不等价，该正则表达式规定了匹配字母数字的先后顺序
     * */
    /**
     * (?=.*xxx)  向前查找xxx，匹配过程不消费字符串
     * (?!.*xxx) 否定向前查找xxx，匹配过程不消费字符串
     * */ 
    /**
     * /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.*[^0-9a-zA-Z])/   等价
     * */ 

}