const Koa = require('koa') 
const router = require('koa-router')();
const jwt = require('jsonwebtoken');
const jwtAuth = require('koa-jwt')

const secret = 'some salt';
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const app = new Koa()

app.keys = ['some keys'] 
app.use(static(__dirname,'./'))
app.use(bodyParser())

router.post('/user/login-token',async (ctx) => {
    const userInfo = ctx.request.body;
    ctx.body = {
        message:'成功',
        token:jwt.sign({
            data:userInfo,
            exp:Math.floor(Date.now()/1000) + 1 * 60 * 60,
        },secret)
    }
})

router.get('/user/getUser-token',
jwtAuth({secret}),
async (ctx) => {
    // console.log(ctx.state.user);
    ctx.body = {
        message:'获取数据成功',
        token:ctx.state.user.data
    }
})

app.use(router.routes())

app.listen(3000)




