const jwt = require('jsonwebtoken')
const db = require('../models')
const PROVIDER = require('../provider')
const { RES_RESULT, SERVER_ERROR, ERROR_FOUND } = require('../service/responses')
const { DATABASE_ERROR } = require('../service/error_handler')
const { Obj } = require('../service/debug')
const { SEND_EMAIL_TO_PENDING_EMPLOYEE } = require('../provider/emailProvider')


module.exports = {




    CREATE:async (req,res)=>{
        let data = req.body 
        let User = req.user
        const expiration = Math.floor(Date.now() / 1000) + (3 * 24 * 60 * 60);
        let company = await PROVIDER.COMPANY.COMPANY_BY_OWNER(User.id)
        let token = jwt.sign({data},process.env.privateKey,{expiresIn:expiration})
        data.company = company.id
        data.token = token
        let isEmployee = await PROVIDER.PENDING_EMPLOYEE.PENDING_EMPLOYEE_BY_EMAIL(data.email)
        let isUser = await PROVIDER.USER.USER_BY_EMAIL(data.email)
        let isEmployePhone = await PROVIDER.PENDING_EMPLOYEE.PENDING_EMPLOYEE_BY_PHONE(data.phone)
        let isUserPhone = await PROVIDER.USER.USER_BY_PHONE(data.phone)
        if(isEmployee == null)
        if(isUser == null)
        if(isEmployePhone == null && isUserPhone == null)
        await db.pendingEmployee.create(data)
        .then(async (result) => {
            RES_RESULT(result,res)
            await SEND_EMAIL_TO_PENDING_EMPLOYEE(data)
        }).catch((err) => {
            DATABASE_ERROR(err,res)
        });
        else
        ERROR_FOUND("The user has already been registered with this phone",res)
        else
        ERROR_FOUND("The user has already been registered with this email",res)
        else
        ERROR_FOUND("The user has already been registered with this email",res)
    },
    USER_PENDING_EMPLOYEES:async (req,res)=>{
        let USER = req.user
        let company = await PROVIDER.COMPANY.COMPANY_BY_OWNER(USER.id)
        let PendingUsers = await PROVIDER.PENDING_EMPLOYEE.PENDING_EMPLOYEE_BY_COMPANY(company.id)
        RES_RESULT(PendingUsers,res)
    },
    DELETE_PENDING_EMPLOYEE:async (req,res)=>{
        let id = req.query.id 
        let USER = req.user 
        let company = await PROVIDER.COMPANY.COMPANY_BY_OWNER(USER.id)
        await db.pendingEmployee.destroy({where:{company:company.id,id:id}})
        .then((result) => {
            RES_RESULT(result,res)
        }).catch((err) => {
            DATABASE_ERROR(err,res)
        }); 
    }



}