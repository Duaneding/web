//1.创建vue实例
const Vue = require('vue');

const app = new Vue({
  template:`<div>hello vue-ssr-diy</div>`
});

//2.创建渲染器实例
const {createRenderer} = require('vue-server-renderer');

const renderer = createRenderer();

renderer
  .renderToString(app)
  .then(html => {
    console.log(html)
  })
  .catch(err => {
    console.log(err);
  })


//3.渲染器渲染实例
