import createApp from './main'

//首屏渲染

export default context => {
  return new Promise((resolve,reject) => {
    const {app,router,store} = createApp(context);
    router.push(context.url);
    router.onReady(() => {
      const match = router.getMatchedComponents();
      Promise
      .all(
        match.map(Component => {
          if(Component.asyncData){
            return Component.asyncData({store,route:router.currentRoute})
          }
        })
      )
      .then(() => {
        context.state = store.state;
        resolve(app)
      })
      .catch(reject)
      
    },reject)
  })
  

}