const arrPrototype = Array.prototype;
const copy_prototype = Object.create(arrPrototype);

['push','pop','shift','unshift'].forEach(key => {
    copy_prototype[key] = function(){
        arrPrototype[key].apply(this,arguments)
        console.log('push has jected');
    }
})

function defineReactive(obj,key,val){
    observe(val)
    const dep = new Dep();
    Object.defineProperty(obj,key,{
        get(){
            console.log('get',key);
            Dep.target && dep.addDeps(Dep.target);
            return val//此处向外暴露变量val，闭包作用域不会释放，该变量一直在缓存中
        },  
        set(newval){
            console.log('set',key);
            //此处用到的val就是缓存中的val
            if(newval !== val){
                observe(newval)
                val = newval
                update()
                dep.notify()
            }
        }
    })
}
function update(){
    // app.innerText = obj.foo
}

function observe(obj){
    if(typeof obj !== 'object' || obj == null)return;

    new Observer(obj)
    
}
function set(obj,key,val){
    defineReactive(obj,key,val)
}
// const obj = {};
// observe(obj)
// obj.foo
// obj.foo = 'pa'
// set(obj,'bar','bar')
// obj.bar


// setInterval(() => {
//     obj.foo = new Date().toLocaleString()
// },1000)

 //对不同数据类型执行响应式操作
class Observer{
    constructor(val){
        if(Array.isArray(val)){
            val.__proto__ = copy_prototype;
            Object.keys(val).forEach((key,ind) => {
                console.log(val[key]);
            })
        }else{
            this.walk(val)
        }
    }
    walk(obj){
        Object.keys(obj).forEach(key => {
            defineReactive(obj,key,obj[key])
        })
    }
}

function proxy(vm){
    Object.keys(vm.$data).forEach(key => {
        Object.defineProperty(vm,key,{
            get(){
                return vm.$data[key]
            },
            set(val){
                vm.$data[key] = val
            }
        })
    })
} 
class Vue{
    constructor(options){
        this.$options = options;
        this.$data = options.data;
        observe(this.$data)
        proxy(this)
        new Complie(options.el,this)
    }
    
}
class Complie{
    constructor(el,vm){
        this.$el = document.querySelector(el);
        this.$vm = vm;
        if(this.$el)this.complie(this.$el)
    }
    complie(el){
        el.childNodes.forEach(node => {
            if(node.nodeType === 1){
                this.complieElement(node)
                if(node.childNodes.length)this.complie(node);
            }else if(this.isInter(node)){
                console.log('====',RegExp.$1,this.$vm[RegExp.$1])
                this.complieText(node)
                // node.textContent = this.$vm[RegExp.$1]
            }
        })
    }
    isInter(node){
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }
    update(node,exp,dir){
        const fn = this[dir+'Updater']
        fn && fn(node,this.$vm[exp]);
        
        new Watcher(this.$vm,exp,function(val){
            fn && fn(node,val);
        })
    }
    textUpdater(node,val){
        node.textContent = val
    }
    htmlUpdater(node,val){
        node.innerHTML = val
    }
    complieText(node){
        this.update(node,RegExp.$1,'text')
    }
    complieElement(node){
        // node.textContent = this.$vm[RegExp.$1]
        let nodeAttrs = node.attributes;
        Array.from(nodeAttrs).forEach(attr => {
            const attrName = attr.name;
            const exp = attr.value;
            if(this.isDir(attrName)){
                const dir = attrName.slice(2);
                this[dir] && this[dir](node,exp);
            }
            if(this.isEvent(attrName)){
                const dir = attrName.substring(1);
                this.eventHandler(node,exp,dir)
            }
        })
    }
    isDir(name){
        return name.startsWith('v-')
    }
    
    text(node,exp){
        this.update(node,exp,'text')
    }
    html(node,exp){
        this.update(node,exp,'html')
    }
    model(node,exp){
        this.update(node,exp,'model')
        node.addEventListener('input',e => {
            this.$vm[exp] = e.target.value
        })
    }
    modelUpdator(node,value){
        node.value = value
    }
    isEvent(dir){
        return /^@[a-z]+$/.test(dir)
    }
    eventHandler(node,exp,dir){
        const fn = this.$vm.$options.methods && this.$vm.$options.methods[exp];
        fn && node.addEventListener(dir,fn.bind(this.$vm))
    }
}
class Watcher{
    constructor(vm,key,updater){
        this.vm = vm
        this.key = key
        this.updater = updater
        Dep.target = this;
        this.vm[this.key]
        Dep.target = null
    }
    update(){
        this.updater.call(this.vm,this.vm[this.key])
    }
}

class Dep{
    constructor(){
        this.deps = []
    }
    addDeps(watcher){
        this.deps.push(watcher)
    }
    notify(){
        this.deps.forEach(w => w.update())
    }
}