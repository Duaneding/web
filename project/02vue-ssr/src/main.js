import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'
import { createStore } from './store'

Vue.config.productionTip = false

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

