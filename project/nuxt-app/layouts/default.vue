<template>
<div>
    <NuxtLink to="/">home</NuxtLink>
    <NuxtLink :to="{name:'about',params:{id:1}}">about</NuxtLink>
    <NuxtLink to="/login">login</NuxtLink>
    <Nuxt />
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>