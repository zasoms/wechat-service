const bot = require('./provider')

/**
 * 
 * @param {*} topic 群名称
 */
module.exports = async (topic, data = {}) => {
	const room = await bot.Room.find({ topic: topic })
	if (!room) return console.log('未找到群组：' + topic)

	if (data.type === 'text') {
		await room.say(data.content)
	} else if (data.type === 'image'){
		console.log('图片')
		// const fileBox = FileBox.fromUrl(`http://screenshot.zasoms.cn?url=${ encodeURIComponent(url) }&device=mobile&model=iPhone%20X&selector=%23catalog&quality=40`, 'xwlb.jpg')
		// await room.say(fileBox)
	}
}