import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'
import { createStore } from './store'

Vue.config.productionTip = false
//全局混入，客户端执行asyncData
Vue.mixin({
  beforeMount(){
    const {asyncData} = this.$options;
    if(asyncData)asyncData({store:this.$store,route:this.$route})
  }
})
export default function createApp(context){
  const store = createStore();
  const router = createRouter();
  const app = new Vue({
    router,
    context,
    store,
    render: h => h(App)
  });
  return {app,router,store}
}

