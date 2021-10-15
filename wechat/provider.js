const { Wechaty } = require("wechaty");

let wechaty
if (!wechaty) {
	wechaty = new Wechaty({
		name: 'WechatStock',
		puppet: 'wechaty-puppet-wechat'
	})
}

module.exports = wechaty
