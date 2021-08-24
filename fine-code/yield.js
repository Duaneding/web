function getRainbowIterator(){
    const colors = ['red','orange','yellow','green','blue','indigo','violet'];
    let ind = -1;
    return {
        next(){
            if(++ind >= colors.length)ind = 0;
            return {value:colors[ind],done:false}
        }
    }
}
console.log(getRainbowIterator().next().value)