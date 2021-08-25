<template>
  <div>
    home
    <NuxtLink v-for="good in goods" :key="good.id" :to="'/detail/' + good.id">{{good.text}}</NuxtLink>
    
    
  </div>
  
</template>

<script>
export default {
  data(){
    return {
      id:Math.floor(Math.random() * 100) ,
      goods:[]
    }
  },
  head(){
    return {
      title:'首页',
      meta:[{name:'description',hid:'description',content:'set page meta'}],
      link:[{rel:'favicon',href:'favicon.ico'}]
    }
  },
  async asyncData({$axios,error}){
    const {ok,goods} = await $axios.$get('/api/goods');
    if(ok)return {goods}
    error({statusCode:400,message:'查询失败，请重试'})
  }
}
</script>
