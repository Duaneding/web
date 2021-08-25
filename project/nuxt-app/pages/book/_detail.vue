<template>
  <div>
      params-{{this.book}}-{{this.id}}
      <br>
      params-{{this.$route.params.book + '-' + this.$route.params.detail}}
  </div>
  
</template>

<script>
export default {
    asyncData({params}){
        const book = params.book;
        const id = params.detail;
        return {book,id}
    }
}
</script>

<style>

</style>