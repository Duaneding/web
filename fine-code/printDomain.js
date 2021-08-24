//树形数据，前序遍历
function printDom_first(node,prefix){
    console.log(prefix + node.nodeName);
    for(let i = 0; i < node.childNodes.length; i++){
        printDom_first(node.childNodes[i],prefix)
    }
}

//树形数据，中序遍历
function printDom_mid(node,prefix){
    const mid = Math.floor(node.childNodes.length / 2);
    for(let i = 0; i < node.childNodes.length; i++){
        printDom_mid(node.childNodes[i],prefix)
        if(i == mid)console.log(prefix + node.nodeName);
    }
    if(node.childNodes.length  == 0)console.log(prefix + node.nodeName);
}

//树形数据，后序遍历
function printDom_last(node,prefix){
    for(let i = 0; i < node.childNodes.length; i++){
        printDom_last(node.childNodes[i],prefix)
    }
    console.log(prefix + node.nodeName);
}