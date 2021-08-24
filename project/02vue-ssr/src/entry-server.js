import createApp from './main'

//首屏渲染

export default context => {
  return new Promise((resolve,reject) => {
    const {app,router,store} = createApp(context);
    router.push(context.url);
    router.onReady(() => {
      const match = router.getMatchedComponents();
      if(!match.length)return reject({code:404})
      //遍历匹配到的每一个组件，执行组件内部的asyncData()
      Promise
      .all(
        match.map(Component => {
          if(Component.asyncData){
            return Component.asyncData({store,route:router.currentRoute})
          }
        })
      )
      .then(() => {
        //渲染器会把context.state序列化为字符串存到window.__INITIAL_STATE__，返回到前端激活之前再解析为对象
        context.state = store.state;
        resolve(app)
      })
      .catch(reject)
      
    },reject)
  })
  

}