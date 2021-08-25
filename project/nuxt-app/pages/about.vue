<template>
  <div v-if="goodInfo.id">{{goodInfo.id + " " + goodInfo.text + " " + goodInfo.detail}}</div>
</template>

<script>
export default {
  data(){
    return {
      goodInfo:{}
    }
  },
  async asyncData({$axios,params,error}){
    console.log(params);
    if(params.id){
      const {goodInfo,ok} = await $axios.$get('/api/detail',{params});
      if(ok){
        if(goodInfo)return {goodInfo}
        else error({statusCode:400,message:'查询商品失败'})
      }else error({statusCode:400,message:'查询失败'})
    }
  }
}
</script>

<style>

</style>