const { SUCCESS_MSG } = require('../service/responses')
const router = require('express').Router()
const Controller = require('../controller')
const Validator = require('../middleware/Validator')
const { userAuth } = require('../auth/Authorize')

//user routs
router.get('/',(req,res)=>SUCCESS_MSG("Hey world",res))
router.post('/users/create',Validator.CREATE_USER_VALIDATOR,Controller.USER_CONTROLLER.CREATE_USER)
router.post('/users/login',Validator.LOGIN_USER,Controller.USER_CONTROLLER.LOGIN_USER)
router.post('/users/verify',Controller.USER_CONTROLLER.VALIDATE_USER)


//Employee routes 
router.post('/employees/create',userAuth,Validator.CREATE_EMPLOYEE_VALIDATOR,Controller.USER_CONTROLLER.CREATE_EMPLOYEE_PROFILE)
module.exports = router