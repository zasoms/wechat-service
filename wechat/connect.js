// https://wechaty.js.org/2021/04/13/wechaty-uos-web/

const bot = require('./provider')

const onScan = require('./handler/scan')
const onError = require('./handler/error')
const onLogin = require('./handler/login')
const onLogout = require('./handler/logout')
const onMessage = require('./handler/message')

module.exports = () => {
	return new Promise((resolve, reject) => {
		bot
			.on('logout', onLogout)
			.on('login', (...args) => {
				onLogin(...args)
				resolve()
			})
			.on('scan', onScan)
			.on('error', (...args) => {
				onError(...args)
				reject()
			})
			.on('message', onMessage)

		bot.start()
		.catch(async e => {
			await bot.stop()
		})
	})
}