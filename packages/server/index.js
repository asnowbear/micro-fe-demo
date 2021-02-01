const Koa = require('koa')
const app = new Koa()
const cors = require('koa2-cors')
const routes = require('./api')
const bodyParser = require('koa-bodyparser')

app.use(cors({
    origin: function(ctx) {
        return ctx.header.origin
    },
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 允许的HTTP的请求方法
    credentials: true, // 标示改响应是合法的
}))

app.use(bodyParser())

app.use(routes.routes(), routes.allowedMethods())

app.listen(3700)

