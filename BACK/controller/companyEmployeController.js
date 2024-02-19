const { Op } = require('sequelize')
const db = require('../models')
const PROVIDER = require('../provider')
const { Obj } = require('../service/debug')
const { RES_RESULT, NOT_FOUND_MSG } = require('../service/responses')

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
    }

}