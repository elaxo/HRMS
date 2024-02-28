const { botAuth } = require('../auth/Authorize')
const botController = require('../controller/botController')

const router = require('express').Router()

const header = process.env.secret

router.post('/bot/user/',botAuth,botController.CREATE_TELEGRAM_USER)
router.get('/bot/define/user',botAuth,botController.defineUser)
router.get('/bot/user/employees',botAuth,botController.MY_EMPLOYEES)
router.get('/bot/user/requests',botAuth,botController.MY_REQUEST)




module.exports = router