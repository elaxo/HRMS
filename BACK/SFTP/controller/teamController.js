const db = require('../models');
const PROVIDER = require('../provider');
const { DATABASE_ERROR } = require('../service/error_handler');
const { RES_RESULT, NOT_FOUND_MSG } = require('../service/responses');




module.exports = {

    CREATE_TEAM:async (req,res)=>{
        let User = req.user
        let data = req.body
        let company = await PROVIDER.COMPANY.COMPANY_BY_OWNER(User.id)
        data.company = company.id 
        await db.teams.create(data)
        .then((result) => {
            RES_RESULT(result,res)
        }).catch((err) => {
            DATABASE_ERROR(err,res)
        });
    },
    LIST_USER_TEAM:async (req,res)=>{
        let User = req.user 
        let company = await PROVIDER.COMPANY.COMPANY_BY_OWNER(User.id)
        let teams = await PROVIDER.TEAM.TEAM_BY_ALL(company.id)
        RES_RESULT(teams,res)
    },
    LIST_DEPARTMENT_TEAM:async (req,res)=>{
        let depId = req.query.id 
        let teams = await PROVIDER.TEAM.TEAM_BY_DEPARTMENT(depId)
        RES_RESULT(teams,res) 
    },
    TEAM_DETAIL:async(req,res)=>{
        let id = req.query.id 
        if(id == null)
        NOT_FOUND_MSG("Required filed missing")
        else 
        {
            let team = await PROVIDER.TEAM.TEAM_BY_ID(id)
            RES_RESULT(team,res)
        }
    }

}