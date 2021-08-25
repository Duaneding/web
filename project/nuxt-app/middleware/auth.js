export default function({route,store,redirect}){
    if(!store.state.user.token){
        redirect('/login?redirect=' + route.path)
    }
}