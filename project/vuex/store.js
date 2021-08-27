let Vue;
class Store{
    constructor(options){
        Vue.util.defineReactive(this,'$$state',options.state)
        this.mutations = options.mutations;
        this.actions = options.actions;
        this.getters = options.getters;

        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)
        for(let key in this.getters){
            Object.defineProperties(this.getters,{
                key:{
                    get(){
                        return this.getters[key](state)
                    },
                    set(type){
                        console.error('不能修改getters中的属性')
                    }
                }
            })
        }
    }
    get state(){
        return this.$$state;
    }
    set state(){
        console.error('不能修改state')
    }
    
    commit(type,payload){
        const entry = this.mutations[type];
        if(!entry)return console.error('mutations中不存在方法：'+type)
        entry(this.state,payload)
    }
    dispatch(type,payload){
        const entry = this.actions[type];
        if(!entry)return console.error('actions中不存在方法：'+type)
        entry(this,payload)
    }

}

function install(_Vue){
    Vue = _vue;
    Vue.mixin({
        beforeCareate(){
            if(this.$options.store){
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}

export default {Store,install}