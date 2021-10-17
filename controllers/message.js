// 文档：https://wechaty.js.org/docs/api/message

const pusher = require('../wechat/pusher')

exports.sendget = async (ctx) => {
  const query = ctx.query
  const type = query.type || 'text'
  const supportTypes = ['text', 'image']
  if (!query.topic) {
    return ctx.body = {
      code: -1,
      message: '请传入群组名称'
    }
  }
  if (!query.content) {
    return ctx.body = {
      code: -1,
      message: '请传入发送的内容'
    }
  }
  if (!supportTypes.some(item => item === type)) {
    return ctx.body = {
      code: -1,
      message: `type错误，请传入type=text 或者 type=image`
    }
  }
  try {
    pusher(query.topic, { type, content: query.content })
    ctx.body = {
      code: 0,
      message: '发送成功'
    }
  } catch(e) {
    ctx.body = {
      code: -1,
      message: e.toString()
    }
  }
}
exports.sendpost = async (ctx) => {
  ctx.body = {
    code: 0,
    message: '发送成功'
    // data: { messa }
  }

}
