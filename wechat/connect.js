// https://wechaty.js.org/2021/04/13/wechaty-uos-web/

const bot = require('./provider')

const onScan = require('./handler/scan')
const onError = require('./handler/error')
const onLogin = require('./handler/login')
const onLogout = require('./handler/logout')
const onMessage = require('./handler/message')

const wxpusher = require('../wxpusher/index')

const main = () => {
	return new Promise((resolve, reject) => {
		bot
			.on('logout', async (user) => {
				onLogout(user)
				await wxpusher({
					contentType: 1,
					summary: 'wechat-service服务logout，该去启动服务了',
					content: 'wechat-service服务logout，该去启动服务了'
				})
				bot.start()
			})
			.on('login', (...args) => {
				onLogin(...args)
				resolve()
			})
			.on('scan', (url, status) => {
				onScan(url, status, (qrcodeImageUrl) => {
					wxpusher({
						contentType: 2,
						summary: 'wechat-service服务该扫码登录了',
						content: `
						<div>wechat-service服务该扫码登录了</div>
						<image src="${ qrcodeImageUrl }"></image>
						`
					})
				})
			})
			.on('error', (...args) => {
				onError(...args)
				reject()
			})
			.on('message', onMessage)
			
			bot
				.start()
				.catch(async e => {
					await bot.stop()
				})
	})
}

module.exports = main