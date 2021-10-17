const http = require('http')
const APP_TOKEN = 'AT_Hezt9X5g3abvvp2VYqQkldFaewKqXP8Y'

function request(data, callback) {
  const options = {
    hostname: 'wxpusher.zjiecode.com',
    port: 80,
    path: '/api/send/message',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const req = http.request(options, function (res) {
    let body = ''
    res.setEncoding('utf8')
    res.on('data', chunk => body += chunk)
    res.on('end', () => {
      callback(null, body)
      console.log(body)
    })
  })
  req.on('error', (e) => {
    callback(e)
  })

  req.write(JSON.stringify(data))
  req.end()
}

const main = (config) => {
  return new Promise((resolve, reject) => {
    request({
      appToken: APP_TOKEN,
      content: config.content || 'test',
      summary: config.summary || '消息摘要',//消息摘要，显示在微信聊天页面或者模版消息卡片上，限制长度100，可以不传，不传默认截取content前面的内容。
      contentType: config.contentType || 1,//内容类型 1表示文字  2表示html(只发送body标签内部的数据即可，不包括body标签) 3表示markdown 
      uids:[ 'UID_nuJystqJVoAjn0xn7NljMkIoTqD1' ],
      url: config.url || '' //原文链接，可选参数
    }, function(err, body) {
      if (err) {
        reject(err)
      } else {
        resolve(body)
      }
    })
  })
}

module.exports = main