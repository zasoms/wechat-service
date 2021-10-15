const messageCtrl = require('../controllers/message')


module.exports = (router) => {
	router
		.get('/message/send', messageCtrl.sendget)
		.post('/message/send', messageCtrl.sendpost)
}