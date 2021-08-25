const Koa = require('koa') 
const app = new Koa();
const bodyparser = require('koa-bodyparser')
const router = require('koa-router')({prefix:'/api'})

//cookie 加密密钥
app.keys = ["some secret","other secret"];

const goods = [
    {id:1,text:'测试一号',detail:'100'},
    {id:2,text:'测试二号',detail:'200'},
    {id:3,text:'测试三号',detail:'300'}]

router.get('/goods',ctx => {
    ctx.body = {ok:1,goods}
})

router.get('/detail',ctx => {
    console.log(ctx.query,ctx.params);
    ctx.body = {
        ok:1,
        goodInfo:goods.find(good => good.id == ctx.query.id)
    }
})

router.post('/login',ctx => {
    const user = ctx.request.body;
    if(user.name === 'dingran' && user.password === '123'){
        const token = 'a mock token';
        ctx.cookies.set('token',token);
        ctx.body = {
            ok:1,
            token
        }
    }else{
        ctx.body = {ok:0}
    }
})

app.use(bodyparser());
app.use(router.routes());

app.listen(8080)