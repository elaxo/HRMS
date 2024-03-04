const moment = require('moment')
const db = require('../models')
const PROVIDER = require('../provider')
const { Info, Obj } = require('../service/debug')
const { DATABASE_ERROR } = require('../service/error_handler')
const { SUCCESS_MSG, RES_RESULT, NOT_FOUND_MSG, ERROR_FOUND } = require('../service/responses')
const employee = require('../models/employee')
const { query } = require('express')
const { SEND_TELEGRAM_NOTIFICATION } = require('../provider/botProvider')

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
        await db.LeaveRequest.findAll({where:{company:company.id,status:0}})
        .then((result) => {
            RES_RESULT(result,res)
        }).catch((err) => {
            DATABASE_ERROR(err,res)
        });
    },
    ACCEPT_REQUEST: async (req,res)=>{

        let requestId = req.query.id 
        let holydays = await db.calendar.findAll()
        const breakDays = async  (dayOff,startDateFrom,endDateFrom)=>{
 
                                        let startDate = moment(startDateFrom)
                                        let endDate = moment(endDateFrom) 
                                        let numberOfDays = Math.abs(startDate.diff(endDate,'days'))
                                        let numberOfDayOff = 0;
                                        let numberOfHolidays = 0;
                                        for (var date = startDate; date.isSameOrBefore(endDate); date.add(1, 'day')) 
                                            {
                                                dayOff.map((each,index)=>{
                                                    if (date.weekday() === dayOff[index]) 
                                                    { 
                                                        numberOfDayOff++;       
                                                    }
                                                })  
                                            }
                                        holydays.map((each)=>{
                                            if(moment(each.date).isBetween(startDate,endDate))
                                            numberOfHolidays++
                                        }) 
                                        let  totalDates = numberOfDays-numberOfDayOff-numberOfHolidays
                                        return totalDates;
        }
        if(requestId != undefined || requestId != null)
        {
            let User = req.user 
            let company = await PROVIDER.COMPANY.COMPANY_BY_OWNER(User.id)    
            if(company != null)
            {
                let request = await db.LeaveRequest.findOne({where:{id:requestId,company:company.id},raw:true})
                if(request != null)
                {
                    await db.LeaveRequest.update({status:1},{where:{id:request.id}})
                    .then(async (result) => {
                        if(result[0]==1)
                        {
                            let userBreak = {
                                requestId:request.id,                            
                                reason:request.reason,
                                userId:request.userId,
                                company:company.id,
                                startDate:request.startDate,
                                endDate:request.endDate
                                        }
                            userBreak.type = request.type == 1 ?"Health Leave":request.type == 2 ? "Birth Leave":request.type == 3? (request.additionalType == 1?"Special Leave - Maternity":request.additionalType == 2?"Special Leave - Mortality":request.additionalType == 3?"Special Leave - Legal case":request.additionalType == 4?"Special Leave - Unknown":"Special Leave - Other") : request.type == 4?"Annual leave":"Unknown Leave"
                            let Employee = await PROVIDER.COMPANY.COMPANY_EMPLOYEE_DETAIL_USERID(request.userId)
                            let PositionDetail = await PROVIDER.POSITION.POSITION_BY_ID(Employee?.position)
                            userBreak.totalDays = await breakDays(PositionDetail?.dayOff,request.startDate,request.endDate)
                            if(request.type == 1)
                            {
                                if(userBreak.totalDays <= 30)
                                userBreak.SalaryInformation = "With salary"
                                else if(userBreak.totalDays > 30 && userBreak.totalDays <= 60)
                                userBreak.SalaryInformation = "1st month with salary, second month 50% salary"
                                else if(userBreak.totalDays > 60 && userBreak.totalDays < 90)
                                userBreak.SalaryInformation = "1st month with salary, second - third month 50% salary,4th and more no Salary"
                                else 
                                userBreak.SalaryInformation = "No salary"
                            }
                            else if(request.type == 2)
                            userBreak.SalaryInformation = "With salary - Up to 5 months"
                            else if(request.type == 3)
                            {
                                if(request.additionalType == 1 || request.additionalType == 2)
                                userBreak.SalaryInformation = "With salary - Up to 3 days"
                                else if(request.additionalType == 3)
                                userBreak.SalaryInformation = "according to the case - with salary"
                                else 
                                userBreak.SalaryInformation = "With no salary"
                            }
                            else if(request.type == 4)
                            {
                                let employ = await PROVIDER.COMPANY.COMPANY_EMPLOYEE_DETAIL_USERID(request.userId)
                                let experience = moment().diff(employ?.startDate,'days')
                                if(experience >= 365)
                                userBreak.SalaryInformation = "With salary up to 16 days only"
                                else 
                                {
                                    let availableDays = (experience*16)/365
                                    userBreak.SalaryInformation = "With salary for "+availableDays+" days"
                                }
                            }
                        await db.breaks.create(userBreak)
                        .then((result) => {
                            SUCCESS_MSG("Accepted",res)
                            SEND_TELEGRAM_NOTIFICATION(request.userId,"Yor leave request accepted by you company HR")
                        }).catch((err) => {
                            DATABASE_ERROR(err,res)
                        });
                        }
                        else
                        ERROR_FOUND("Something wrong")
                    }).catch((err) => {
                        DATABASE_ERROR(err,res)
                    });
                }
                else 
                NOT_FOUND_MSG("Request is missing",res)
    
            }
            else 
            NOT_FOUND_MSG("Company is missing",res)
        }
        else 
        NOT_FOUND_MSG("Required field is missing",res)
    }
}



