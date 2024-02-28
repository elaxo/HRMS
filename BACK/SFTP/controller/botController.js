const db = require("../models")
const { USER_BY_PHONE } = require("../provider/userProvider")
const { Obj, Info } = require("../service/debug")
const { DATABASE_ERROR } = require("../service/error_handler")
const { ERROR_FOUND, SUCCESS_MSG, RES_RESULT, NOT_FOUND_MSG } = require("../service/responses")
const PROVIDER = require('../provider')


module.exports = {

    CREATE_TELEGRAM_USER: async (req,res)=>{
        let telegramUser = req.body 
        let user = await USER_BY_PHONE(telegramUser.phone_number)
        
        if(user == null)
        ERROR_FOUND("User_not found",res)
        else 
        {
        let find = await db.TelegramUser.findOne({where:{userId:user.id},raw:true})
        if(find == null)
        {
            telegramUser.userId = user.id
            await db.TelegramUser.create(telegramUser)
            .then((result) => {
                SUCCESS_MSG("CREATED",res)
            }).catch((err) => {
                DATABASE_ERROR(err,res)
            });

        }
        else 
        SUCCESS_MSG("already created",res)
        }
    },
    defineUser:async (req,res)=>{
        let id = req.query.user_id
        let User = await db.TelegramUser.findOne({where:{user_id:id},raw:true})
        if(User != null)
        {
            let userType = await PROVIDER.USER.USER_BY_ID(User.userId)
            Obj(userType)
            if(userType != null)
            if(userType.role == 111)
            RES_RESULT("COMPANY",res)
            else
            RES_RESULT("EMPLOYEE",res)
            else 
            NOT_FOUND_MSG("User not found",res)
        }
        else 
        NOT_FOUND_MSG("USER NOT FOUND",res)
    },
    MY_EMPLOYEES:async (req,res)=>{
        let User = req.query.user_id
        let TelegramInfo = await db.TelegramUser.findOne({where:{user_id:User},raw:true})
        if(TelegramInfo != null)
        {
           let userInfo = await PROVIDER.USER.USER_BY_ID(TelegramInfo.userId)
           
           if(userInfo?.role == 111)
           {
                let company = await PROVIDER.COMPANY.COMPANY_BY_OWNER(TelegramInfo.userId)
                
                if(company != null)
                {
                    let companyEmployees = await PROVIDER.COMPANY.COMPANY_EMPLOYEES(company.id)
                    let response = []
                    await Promise.all(companyEmployees.map(async (each)=>{
                            let userProfile = await PROVIDER.EMPLOYEE_PROFILE.EMPLOYEE_BY_USERID(each.profileId) 
                            response.push(userProfile)
                    }))
                    RES_RESULT(response,res)
                }
                else 
                NOT_FOUND_MSG("Company not found",res)
           }
           else 
           NOT_FOUND_MSG("Users is not employee",res) 
        }
    },
    MY_REQUEST:async (req,res)=>{
        let User = req.query.user_id
        let TelegramInfo = await db.TelegramUser.findOne({where:{user_id:User},raw:true})
        if(TelegramInfo != null)
        {
            let company = await PROVIDER.COMPANY.COMPANY_BY_OWNER(TelegramInfo.userId)
            if(company != null)
            {
                let requests = await db.LeaveRequest.findAll({where:{company:company.id}})
                RES_RESULT(requests,res)
            }
            else 
            NOT_FOUND_MSG("Company not found",res)
                
        }
        else 
        NOT_FOUND_MSG("Employee not found",res)
      
    }

}