const db = require('../models')
const PROVIDER = require('../provider')
const { DATABASE_ERROR } = require('../service/error_handler')
const { RES_RESULT, NOT_FOUND_MSG, SUCCESS_MSG, ERROR_FOUND } = require('../service/responses')


module.exports = {

    CREATE_BRANCH:async (req,res)=>{
        let User = req.user 
        let {branchName} = req.body
        let company = await PROVIDER.COMPANY.COMPANY_BY_OWNER(User.id)
        if(company != null)
        await db.branch.create({name:branchName,ownUser:User.id,company:company.id})
        .then((result) => {
            RES_RESULT(result,res)
        }).catch((err) => {
            DATABASE_ERROR(err,res)
        });
    },
    USER_BRANCHES_LIST:async (req,res)=>{
        let User = req.user 
        RES_RESULT(await PROVIDER.BRANCH.BRANCH_BY_USER(User.id),res)
    },
    SINGLE_BRANCH_DETAIL:async (req,res)=>{
        let id = req.query.id 
        if(id != null)
        {
            let branch = await PROVIDER.BRANCH.BRANCH_BY_ID(id)
            RES_RESULT(branch,res)
        }
        else
        NOT_FOUND_MSG("Required parm not found",res)
    },
    UPDATE_BRANCH:async (req,res)=>{
        let branch = req.query.id 
        let body = req.body
        let User = req.user
        if(branch != undefined || body != undefined)
        {
            let company = await PROVIDER.COMPANY.COMPANY_BY_OWNER(User.id)
            await db.branch.update({name:body?.branchName},{where:{id:branch,company:company.id}})
            .then((result) => {
                if(result[0] == 1)
                SUCCESS_MSG("Updated",res)
            }).catch((err) => {
                DATABASE_ERROR(err,res)
            });
        }
        else
        NOT_FOUND_MSG("Required filed missing",res)
    },
    DELETE_BRANCH:async (req,res)=>{
        let id = req.query.id 
        let User = req.user 
        if(id == undefined || id == null)
        NOT_FOUND_MSG("Required filed",res)
        else
        { 
        let department = await PROVIDER.DEPARTMENT.DEPARTMENT_BY_BRANCH(id)
        if(department == null)
        await db.branch.destroy({where:{id:id,ownUser:User.id}})
        .then((result) => {
            SUCCESS_MSG("Branch deleted",res)
        }).catch((err) => {
            DATABASE_ERROR(err,res)
        });
        else 
        ERROR_FOUND("Please contact administrator this branch has related departments",res)
    
    }
    }
}