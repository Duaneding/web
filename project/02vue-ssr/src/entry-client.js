//激活spa应用程序
import createApp from './main'

const {app,router,store} = createApp();
//回复store.state
if(window.__INITIAL_STATE__)store.replaceState(window.__INITIAL_STATE__);
router.onReady(() => {
  app.$mount('#app');
})