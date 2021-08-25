import { resolve } from "path"
export default {
  alias: {
    'style': resolve(__dirname, './assets/style')
  },
  // define the development or production mode of Nuxt.js
  dev: process.env.NODE_ENV !== 'production',
  // define environment variables that are required at build time
  env: {
    baseURL: process.env.BASE_URL
  },
  // is available using $config in both server and client.
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || 'https://nuxtjs.org'
  },
  // is only available on server using same $config (it overrides publicRuntimeConfig)
  privateRuntimeConfig: {
    apiSecret: process.env.API_SECRET
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  // customize the loading component that Nuxt.js uses by default.
  loading: {
    color: '#fff'
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/api-inject.js',
    '~/plugins/interceptor.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/eslint-module'],

  // Modules: https://go.nuxtjs.dev/config-modules
  exampleMsg:'我是测试的module',
  axios: {
    option1:"option1",
    option2:"option2"
  },
  
  modules: [
    [
      '~/modules/example',{token:123}],
      '@nuxtjs/axios',
      'cookie-universal-nuxt'
  ],
  axios:{
    proxy:true
  },
  proxy:{
    '/api':'http://localhost:8080'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  static: {
    prefix: false
  },
  router:{
    extendRoutes(routes,resolve){
      routes.push({
        path:'/foo',
        component:resolve(__dirname,'pages/othername.vue')
      })
    }
  }
}
