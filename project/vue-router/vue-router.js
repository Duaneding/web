let Vue;

class VueRouter{
    constructor(routes){
        // 1.解析routes
        this.$routes = routes;
        //current值改变时，render会重新执行
        Vue.util.defineReactive(this,'current','/');
        // 2.监听hash变化
        window.addEventListener('hashchange',() => {
            this.current = window.location.hash.slice(1)
        })
        // 3.响应hash变化
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
            let comp = null;
            //找到与current对应的component
            
            const route = this.$router.$routes.find(item => item.path === this.$router.current)
            if(route){
                comp = route.component
            }
            return h(comp)
        }
    })
}

export default VueRouter;