const moment = require('moment')
const db = require('../models')
const PROVIDER = require('../provider')
const { Info, Obj } = require('../service/debug')
const { DATABASE_ERROR } = require('../service/error_handler')
const { SUCCESS_MSG, RES_RESULT, NOT_FOUND_MSG, ERROR_FOUND } = require('../service/responses')
const employee = require('../models/employee')

module.exports = {
    CREATE_COMPANY:async (req,res)=>{
        let ownUser = req.user 
        let data = req.body 
        data.ownUser = ownUser.id
        let branchs = data.branchs
        delete data['branchs']
        await db.Company.create(data)
        .then(async(result) => {
            let company = result 
            await Promise.all(branchs.map(async(each)=>{
                db.branch.create({
                    name:each,
                    ownUser:ownUser.id,
                    company:company.id
                })
            }))
            await db.Users.update({role:111,userType:1},{where:{id:ownUser.id}})
            .then(async (result) => {
                if(result[0] != 0){
                SUCCESS_MSG("COMPANY created success!",res)
                PROVIDER.TELEGRAM.SEND_TELEGRAM_NOTIFICATION(ownUser.id,`Your company ${data.companyName} successfully created`)
                }
                else
                {
                    await db.Company.destroy({where:{id:company.id}})
                    .then((result) => {
                       ERROR_FOUND("Something wrong",res) 
                    }).catch((err) => {
                        DATABASE_ERROR(err,res)
                    });
                }
            }).catch((err) => {
                DATABASE_ERROR(err,res)
            });
        }).catch((err) => {
            DATABASE_ERROR(err,res)
        });
    },
    USER_COMPANY_DETAIL:async (req,res)=>{
        let user = req.user 
        if(user != null)
        RES_RESULT(await PROVIDER.COMPANY.COMPANY_BY_OWNER(user.id),res)
        else 
        NOT_FOUND_MSG("Company not found",res)
    },
    MY_EXPERIENCE:async (req,res)=>{

        let User = req.user 
        //let company = await PROVIDER.COMPANY.COMPANY_BY_OWNER(User.id)
        let EmployData = await PROVIDER.COMPANY.COMPANY_EMPLOYEE_DETAIL_USERID(User.id)
        if(EmployData != null)
        {

            const now = moment();
            let startDate = moment(EmployData.startDate)
            const numberOfDays = startDate.diff(now, 'days')*-1;
            let availableBreakDays = (16*numberOfDays)/365 
            let result = {experience:startDate.fromNow(),availableBreaks:parseInt(availableBreakDays)}
            RES_RESULT(result,res)
        }
        else
        NOT_FOUND_MSG("Your not employed",res)
    },
    RECEIVED_REQUEST: async (req,res)=>{

        let User = req.user 
        let company = await PROVIDER.COMPANY.COMPANY_BY_OWNER(User.id)
        await db.LeaveRequest.findAll({where:{company:company.id}})
        .then((result) => {
            RES_RESULT(result,res)
        }).catch((err) => {
            DATABASE_ERROR(err,res)
        });
    }
}



