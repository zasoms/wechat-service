const bot = require('./provider')
const { FileBox } = require('wechaty')

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
		const fileBox = FileBox.fromUrl(data.content)
		await room.say(fileBox)
	}
}