const { botAuth } = require('../auth/Authorize')
const { CREATE_TELEGRAM_USER } = require('../controller/botController')

const router = require('express').Router()

const header = process.env.secret

router.post('/bot/user/',botAuth,CREATE_TELEGRAM_USER)





module.exports = router