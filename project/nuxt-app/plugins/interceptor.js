export default function({$axios,store}){
    $axios.onRequest(config => {
        if(store.state.user.token){
            config.headers.Authorization = 'bear' + store.state.user.token
        }
        return config;
    })
}