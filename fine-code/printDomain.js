//树形数据，前序遍历
function printDom_first(node,prefix){
    console.log(prefix + node.nodeName);
    for(let i = 0; i < node.children.length; i++){
        printDom_first(node.children[i],prefix)
    }
}

//树形数据，层序遍历
function printDom_line(node,prefix){
    let arr=[node],temp = [];
    while(arr.length){
        const item = arr.shift();
        if(item.nodeName)temp.push(item.nodeName)
        if(item.children.length)arr = arr.concat([...item.children]);
    }
   console.log(temp.join('-')); 
}

//树形数据，后序遍历
function printDom_last(node,prefix){
    for(let i = 0; i < node.children.length; i++){
        printDom_last(node.children[i],prefix)
    }
    console.log(prefix + node.nodeName);
}

const like_node = {
    nodeName:1,
    children:[{
        nodeName:2,
        children:[{
            nodeName:4,
            children:[{
                nodeName:6,
                children:[{
                    nodeName:7,
                    children:[]
                }]
            }]
        }]
    },{
        nodeName:3,
        children:[{
            nodeName:5,
            children:[]
        }] 
    }]
}
//前序   1-2-4-6-7-3-5
//中序   4-6-7-2-1-5-3
//后序   7-6-4-2-5-3-1
//层序   1-2-3-4-5-6-7
console.log('first:/n')
printDom_first(like_node,'')
console.log('mid:/n')
printDom_line(like_node,'')
console.log('last:/n')
printDom_last(like_node,'')
