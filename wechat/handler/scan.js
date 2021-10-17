const qrcode = require('qrcode-terminal')

const onScan = (url, status, callback) => {
  qrcode.generate(url, { small: true })

  const qrcodeImageUrl = [
    'https://api.qrserver.com/v1/create-qr-code/?data=',
    encodeURIComponent(url),
  ].join('')


  console.log(`[${status}] ${qrcodeImageUrl}\nScan QR Code above to log in: `)

  callback && callback(qrcodeImageUrl)
}

module.exports = onScan