//nodejs
const express = require('express');

const server = express();
//绝对路径
const resolve = dir => require('path').resolve(__dirname,dir);
//开放client文件夹访问权限，并关闭默认下载index.html的选项，否则后面的路由不会执行
server.use(express.static(resolve("../dist/client"),{index:false}));
//2.创建渲染器实例
const {createBundleRenderer} = require('vue-server-renderer');

const bundle = resolve("../dist/server/vue-ssr-server-bundle.json")
const renderer = createBundleRenderer(bundle, {
  runInNewContext:false,// https://ssr.vuejs.org/zh/api/#runinnewcontext
  template:require('fs').readFileSync(resolve('../public/index.html'),'utf-8'), //宿主文件
  clientManifest:require(resolve("../dist/client/vue-ssr-client-manifest.json"))//客户端脚本清单
});

server.get('*',(req,res) => {
  const context = {
    url:req.url
  }
  renderer
    .renderToString(context)
    .then(html => {
      console.log(html);
      res.send(html)
    })
    .catch(err => {
      console.log(err)
      res.status(500)
      res.send('Internal Server Error, 500!')
    })
})

server.listen(8000,(err) => {
  console.log('server is running')
})