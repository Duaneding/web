export const state = () => ({
    counter: 0
})

export const mutations = {
    increment(state) {
        state.counter++
    }
}

export const actions = {
    nuxtServerInit({commit},{app}){
        //cookie-universal-nuxt 用法如下：app是koa实例
        const token = app.$cookies.get('token')
        if(token)commit('user/init',token)
    }
}