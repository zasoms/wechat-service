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
			.on('logout', (user) => {
				onLogout(user)
				wxpusher({
					contentType: 3,
					summary: 'wechat-service服务退出登录了，该去启动服务了',
					content: 'wechat-service服务退出登录了，该去启动服务了'
				})
				main()
			})
			.on('login', (...args) => {
				onLogin(...args)
				resolve()
			})
			.on('scan', (url, status) => {
				onScan(url, status, (qrcodeImageUrl) => {
					wxpusher({
						contentType: 3,
						summary: 'wechat-service服务该扫码登录了',
						content: `
						wechat-service服务该扫码登录了
						![扫码](${qrcodeImageUrl})
						`
					})
				})
			})
			.on('error', (...args) => {
				console.log('onerror', ...args)
				onError(...args)
				reject()
			})
			.on('message', onMessage)
			
			bot.start()
			.catch(async e => {
				console.log('catch', e)
				main()
				await bot.stop()
			})
	})
}

module.exports = main