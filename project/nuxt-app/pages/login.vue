<template>
  <div>
    <div><input type="text" v-model="user.name"></div>
    <div><input type="password" v-model="user.password"></div>
    <button @click="onLogin">登录</button>
  </div>
</template>

<script>
export default {
  layout:'blank',
  data(){
    return {
      user:{name:'',password:''}
    }
  },
  methods:{
    onLogin(){
      console.log('api-store',this.$store)
      this.$store.dispatch('user/login',this.user).then((isLogined) => {
        if(isLogined){
          const redirect = this.$route.query.redirect || '/';
          console.log(redirect);
          this.$router.push(redirect);
        }
      })
    }
  }
}
</script>

<style>

</style>