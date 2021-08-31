const Koa = require('koa')
const app = new Koa();
const session = require('koa-session')
const redisStore = require('koa-redis')
const redis = require('redis')
const redisClient = redis.createClient(6379,'localhost');

const wrapper = require('co-redis')
//包装成async await语法
const client = wrapper(redisClient)

app.keys = ['some salt']

const SESS_CONFIG = {
    key:"foo:kkdh",
    stroe:redisStore({ client })
}
app.use(session(SESS_CONFIG,app))


app.use(async (ctx,next) => {
    const keys = await client.keys('*');
    keys.forEach(key => {
        console.log(key,await client.get(key));
    });
    next()
})

let n = 0;
app.use(ctx => {
    if(ctx.url === '/favicon.ico')return
    ctx.session.count = n++;
    ctx.body = `第${n}次访问`
})

app.listen(3000)