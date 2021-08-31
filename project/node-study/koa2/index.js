const Koa = require('koa');
const app = new Koa()


app.use(async (ctx,next) => {
    const startTime = Date.now();
    next()
    const endTime = Date.now();
    console.log('执行时间：',endTime - startTime);
})
app.use(ctx => {
    const now = Date.now();
    while(Date.now() < now + 100)
    ctx.body = {
        name:'tom'
    }

})

app.listene(8000,err => {
    console.log('server is running at 8000');
})
