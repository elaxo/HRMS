const { Op } = require('sequelize')
const db = require('../models')
const PROVIDER = require('../provider')
const { Obj } = require('../service/debug')
const { RES_RESULT, NOT_FOUND_MSG } = require('../service/responses')
const { DATABASE_ERROR } = require('../service/error_handler')

module.exports = {

    COMPANY_EMPLOYEE:async (req,res)=>{
        let User = req.user 
        let company = await PROVIDER.COMPANY.COMPANY_BY_OWNER(User.id)
        let Employs = await PROVIDER.COMPANY.COMPANY_EMPLOYEES(company.id)
        RES_RESULT(Employs,res)
    },
    EMPLOYEE_DETAIL:async (req,res)=>{
    
        let profileId = req.query.id 
        let User = req.user 
        let company = await PROVIDER.COMPANY.COMPANY_BY_OWNER(User.id)
        let employList = await db.CompanyEmployee.findOne({where:{profileId:profileId,companyId:company.id},raw:true})
        if(employList == null)
        NOT_FOUND_MSG("Employee not found",res)
        else
        {
            let profile = await PROVIDER.EMPLOYEE_PROFILE.EMPLOYEE_BY_USERID(profileId)
            RES_RESULT(profile,res)
        }        
    },
    SEARCH_EMPLOY:async (req,res)=>{
        let query = req.body 
       console.log(query)
        if(query != null)
        if(query.branch == null && query.team == null && query.department != null) //Department
        {
            let result = await db.positions.findAll({where:{department:query.department}})
            let RESPONSE = []
            await Promise.all(result.map(async(each)=>{
                let userResult = await db.CompanyEmployee.findOne({where:{position:each.id},raw:true})
                RESPONSE.push(userResult)
            }))
            RES_RESULT(RESPONSE,res)
        }
        else if(query.branch == null && query.team != null && query.department == null) //Team
        {
            let result = await db.positions.findAll({where:{team:query.team}})
            let RESPONSE = []
            await Promise.all(result.map(async(each)=>{
                let userResult = await db.CompanyEmployee.findOne({where:{position:each.id},raw:true})
                RESPONSE.push(userResult)
            }))
            RES_RESULT(RESPONSE,res)
        }
        else if(query.branch != null && query.team == null && query.department == null) //Branch
        {
            let result = await db.positions.findAll({where:{branch:query.branch}})
            let RESPONSE = []
            await Promise.all(result.map(async(each)=>{
                let userResult = await db.CompanyEmployee.findOne({where:{position:each.id},raw:true})
                RESPONSE.push(userResult)
            }))
            RES_RESULT(RESPONSE,res)
        }
        else if(query.branch != null && query.team == null && query.department != null) //Branch - Department
        {
            let result = await db.positions.findAll({where:{branch:query.branch,department:query.department}})
            let RESPONSE = []
            await Promise.all(result.map(async(each)=>{
                let userResult = await db.CompanyEmployee.findOne({where:{position:each.id},raw:true})
                RESPONSE.push(userResult)
            }))
            RES_RESULT(RESPONSE,res)
        }
        else if(query.branch != null && query.team != null && query.department == null) //Branch - Team
        {
            let result = await db.positions.findAll({where:{branch:query.branch,team:query.team}})
            let RESPONSE = []
            await Promise.all(result.map(async(each)=>{
                let userResult = await db.CompanyEmployee.findOne({where:{position:each.id},raw:true})
                RESPONSE.push(userResult)
            }))
            RES_RESULT(RESPONSE,res)
        }
        else if(query.branch != null && query.team != null && query.department != null) //All
        {
            let result = await db.positions.findAll({where:{branch:query.branch,team:query.team,department:query.department}})
            let RESPONSE = []
            await Promise.all(result.map(async(each)=>{
                let userResult = await db.CompanyEmployee.findOne({where:{position:each.id},raw:true})
                RESPONSE.push(userResult)
            }))
            RES_RESULT(RESPONSE,res)
        }
        else if(query.branch == null && query.team != null && query.department != null) //Team - Department
        {
            let result = await db.positions.findAll({where:{department:query.department,team:query.team}})
            let RESPONSE = []
            await Promise.all(result.map(async(each)=>{
                let userResult = await db.CompanyEmployee.findOne({where:{position:each.id},raw:true})
                RESPONSE.push(userResult)
            }))
            RES_RESULT(RESPONSE,res)
        }
    },
    SEARCH_QUERY:async (req,res)=>{

        let q = req.query.q 
        let company = await PROVIDER.COMPANY.COMPANY_BY_OWNER(req.user.id)
        let SearchResult = await db.Employees.findAll({where:{name:{[Op.like]:q+"%"}},raw:true})
        let response = []
        let CompanyEmployees = await PROVIDER.COMPANY.COMPANY_EMPLOYEES(company.id)
        await Promise.all(SearchResult.map(async (each)=>{
            CompanyEmployees.map((employee)=>{
                if(each.userId == employee.profileId)
                response.push(each)
            })
        }))
        RES_RESULT(response,res)
    },
    ME_IN_COMPANY: async (req,res)=>{

        let User = req.user 
        let UserProfile = await PROVIDER.COMPANY.COMPANY_EMPLOYEE_DETAIL_USERID(User.id)
        if(UserProfile != null)
        {
            let company = await PROVIDER.COMPANY.COMPANY_BY_COMPANY_ID(UserProfile.companyId)
            RES_RESULT(company,res)
        }
        else
        NOT_FOUND_MSG("Company not found",res)



    },
    GET_DAYOFF:async (req,res)=>{

        let User = req.user 
        let employee = await PROVIDER.COMPANY.COMPANY_EMPLOYEE_DETAIL_USERID(User.id)
        if(employee != null)
        {
            let position = await PROVIDER.POSITION.POSITION_BY_ID(employee.position)
            RES_RESULT(position,res)
        }
        else
        NOT_FOUND_MSG("Employee not found",res)
    },
    LEAVE_REQUEST:async (req,res)=>{
        let User = req.user 
        let leaveData = req.body 
        let companyEmployee = await PROVIDER.COMPANY.COMPANY_EMPLOYEE_DETAIL_USERID(User.id)
        if(companyEmployee != null)
        {
            leaveData.userId = User.id
            leaveData.company = companyEmployee.companyId
            await db.LeaveRequest.create(leaveData)
            .then((result) => {
                RES_RESULT(result,res)
            }).catch((err) => {
                DATABASE_ERROR(err,res)
            });
        }
        else
        NOT_FOUND_MSG("Your not employed",res)
    },
    MY_REQUESTS:async (req,res)=>{
        let User = req.user 
        await db.LeaveRequest.findAll({where:{userId:User.id}})
        .then((result) => {
            RES_RESULT(result,res)
        }).catch((err) => {
            DATABASE_ERROR(err,res)
        });
    },
    EMPLOYEE_POSITION: async (req,res)=>{
        
        let User = req.user 
        let id = req.query.id 
        if(id != undefined)
        {
            let employee = await PROVIDER.COMPANY.COMPANY_EMPLOYEE_DETAIL_USERID(id)
            if(employee != null)
            {
                let Position = await PROVIDER.POSITION.POSITION_BY_ID(employee.position)
                RES_RESULT(Position,res)
            }
            else 
            NOT_FOUND_MSG("Employee not found",res)
            
        }
        else
        NOT_FOUND_MSG("Required filed missing",res)

    }

}