//nodejs
const express = require('express');

const server = express();
//1.创建vue实例
const Vue = require('vue');
 //2.创建渲染器实例
 const {createRenderer} = require('vue-server-renderer');

 const renderer = createRenderer();

server.get('/',(req,res) => {

  const app = new Vue({
    template:`<div @click="onClick">hello vue-ssr-diy -- {{msg}}</div>`,
    data(){
      return {
        msg:"vue ssr"
      }
    },
    methods:{
      onClick(){
        console.log('a ha');
      }
    }
  });

  //3.渲染器渲染实例
  renderer
    .renderToString(app)
    .then(html => {
      res.send(html)
    })
    .catch(err => {
      res.status(500)
      res.send('Internal Server Error, 500!')
    })
})

server.listen(8000,(err) => {
  console.log('server is running')
})