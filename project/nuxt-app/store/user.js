
export const state = () => ({
    token: ''
})

export const mutations = {
    init(state,token){
        state.token = token
    }
}

export const getters = {
    isLogged(state){
        return !!state.token
    }
}

export const actions = {
    login({commit,getters},u){
        return this
        .$login(u)
        .then(({token}) => {
            console.log('-------',token);
            if(token)commit('init',token)
            return getters.isLogged
        })
    }
}