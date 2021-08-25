<template>
    <div>
        <h1 v-if="error.statusCode === 404">the page is not found.404</h1>
        <h1 v-else>sorry,error occued!</h1>
        <p>{{error}}</p>
        <NuxtLink to="/">首页</NuxtLink>
    </div>
</template>

<script>
export default {
    props:['error'],
    layout:'blank',
}
</script>

<style>

</style>