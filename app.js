const Koa = require('koa')
const Router = require('koa-router')
const cors = require('koa-cors')
const bodyParser = require('koa-bodyparser')

const wechat = require('./wechat/connect.js')

;(async () => {
  await wechat()

  const app = new Koa()
  const router = new Router()

	app.use(bodyParser())
  app.use(cors())

  app.use((ctx, next) => {
    // 怕别人乱用，我这边需要生成一个token
    const token = ctx.query.token
    if (token === 'yg4fKwFA6DPYnpHBxN8sGiEM5vRWlQTu') {
      next()
    } else {
      ctx.status = 401
      ctx.body = 'Protected resource, use Authorization header to get access';
    }
	})

	const message = require('./routes/message')
  message(router)

	app.use(router.routes())
		.use(router.allowedMethods())

  app.listen(3000, () => {
    console.log('http://127.0.0.1:3000')
  })
})()