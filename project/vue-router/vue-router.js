let Vue;
class VueRouter{
    constructor(options){
        // 1.解析routes
        this.$options = options;
        //current值改变时，render会重新执行
        this.current = window.location.hash || '/';
        Vue.util.defineReactive(this,'matched',[]);
        this.match()
        // 2.监听hash变化
        window.addEventListener('hashchange',() => {
            this.current = window.location.hash.slice(1);
            this.matched = [];
            this.match();
        })
        // 3.响应hash变化,router-view的render完成
    }
    match(routes){
        routes = routes || this.$options.routes;
        for(let route of routes){
            if(route.path === '/' && this.current === '/'){
                this.matched.push(route)
                return
            }
            if(route.path !== '/' && this.current.indexOf(route.path) != -1){
                this.matched.push(route)
                if(route.childen){
                    this.match(route.childen)
                }
                return
            }
        }
    }
}

VueRouter.install = function(_Vue){
    Vue = _Vue;
    Vue.mixin({
        beforeCreate(){
            if(this.$options.router){
                Vue.prototype.$router = this.$options.router
            }
        }
    })
    
    Vue.component('router-link',{
        props:{
            to:{type:String,default:''}
        },
        render(h){
            // return <a to={'#' + this.to}>{this.$slots.default}</a>   、、JSX写法
            return h('a',{attrs:{href:'#' + this.to}},this.$slots.default)
        }
    })
    // 晚于根实例创建
    Vue.component('router-view',{
        //render内部用到的值（current）需要是响应式，才能在值发生变化的时候自动重新执行
        render(h){
            this.$vnode.data.routerView = true;
            let depth = 0;
            let parent = this.$parent
            while(parent){
                const vnodeData = parent.$vnode && parent.$vnode.data;
                if(vnodeData && vnodeData.routerView){
                    depth++
                }
                parent = this.$parent;
            }

            let comp = null;
            //找到与current对应的component
            
            const route = this.$router.mathed[depth]
            if(route){
                comp = route.component
            }
            return h(comp)
        }
    })
}

export default VueRouter;