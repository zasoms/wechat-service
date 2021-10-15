const bot = require('../provider')

const heart = (text = '[爱心]') => bot.say(text)

const onLogin = (user) => {
	console.log(`${ user.name() } login`, Date.now())
	// 正式代码
	// 保持心跳
  setInterval(() => heart(), 1000 * 60 * 45)
  bot.say('Wechat login').catch(console.error)
}

module.exports = onLogin