const pusher = require('../wechat/pusher')

exports.sendget = async (ctx) => {
  const query = ctx.query
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
  try {
    pusher(query.topic, { type: 'text', content: query.content })
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
