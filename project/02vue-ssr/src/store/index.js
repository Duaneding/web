import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore(){
  return new Vuex.Store({
    state:{
      count:0
    },
    mutations:{
      init(state,count){
        state.count = count;
      },
      add(state){
        state.count += 1;
      }
    },
    actions:{
      getCount({commit}){
        return new Promise((resolve,reject) => {
          setTimeout(() => {
            commit('init',Math.random() * 100)
            resolve()
          },1000)
        })
      }
    }
  })
}