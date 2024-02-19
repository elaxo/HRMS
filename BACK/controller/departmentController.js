const db = require('../models')
const PROVIDER = require('../provider')
const { Obj } = require('../service/debug')
const { DATABASE_ERROR } = require('../service/error_handler')
const { RES_RESULT, SUCCESS_MSG, NOT_FOUND_MSG } = require('../service/responses')
module.exports = {
    CREATE_DEPARTMENT:async (req,res)=>{
        let User = req.user 
        let department = req.body
        let Company = await PROVIDER.COMPANY.COMPANY_BY_OWNER(User.id)
        if(Company != null)
        await db.department.create({
            name:department.name,
            company:Company.id,
            branch:department.isBranch?department.branch:null,
            productService:department.productAndService,
            isBranch:department.isBranch
        })
        .then((result) => {
            RES_RESULT(result,res)
        }).catch((err) => {
            DATABASE_ERROR(err,res)
        });
    },
    USERS_DEPARTMENT_LIST:async (req,res)=>{
        let User = req.user 
        let company = await PROVIDER.COMPANY.COMPANY_BY_OWNER(User.id)
        Obj(company)
        console.log(User)
        let departments = await PROVIDER.DEPARTMENT.DEPARTMENT_BY_COMPANY(company.id)
        RES_RESULT(departments,res)
    },
    UPDATE_DEPARTMENT:async(req,res)=>{
        let {name,productService} = req.body 
        let department = req.query.id 
        let User = req.user
        let Company = await PROVIDER.COMPANY.COMPANY_BY_OWNER(User.id)
        await db.department.update({name:name,productService:productService},{where:{id:department,company:Company.id}})
        .then((result) => {
            if(result[0] == 1)
            SUCCESS_MSG("Updated msg",res)
            else 
            NOT_FOUND_MSG("Department not found",res)
        }).catch((err) => {
            DATABASE_ERROR(err,res)
        });
    },
    SINGLE_DEPARTMENT:async (req,res)=>{
        let id = req.query.id
        let department = await PROVIDER.DEPARTMENT.DEPARTMENT_BY_ID(id)
        RES_RESULT(department,res)
    }
}
