//激活spa应用程序
import createApp from './main'

const {app,router} = createApp();
router.onReady(() => {
  app.$mount('#app');
})