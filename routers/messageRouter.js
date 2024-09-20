const {Router} = require('express')
const { getMessages } = require ('../controllers/messageController')
const auth = require('../middlewares/auth')


const messageRouter = Router()

messageRouter.get('/getMessages/:yourId/:otherId', auth, getMessages)

module.exports = messageRouter
