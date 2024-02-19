const db = require('../models');
const PROVIDER = require('../provider');
const { DATABASE_ERROR } = require('../service/error_handler');
const { RES_RESULT, NOT_FOUND_MSG } = require('../service/responses');

let ValidateTeam = async (User,team)=>{
        let company = await PROVIDER.COMPANY.COMPANY_BY_OWNER(User.id)
        let department = await PROVIDER.DEPARTMENT.DEPARTMENT_BY_COMPANY(company.id)
        let allow = false
        await Promise.all(department.map(async (each)=>{
            let team_m = await PROVIDER.TEAM.TEAM_BY_ID(team)
            if(team_m?.department == each.id)
            allow = true
        }))
        return allow
}


module.exports = {

    CREATE_POSITION:async (req,res)=>{
        let User = req.user 
        let company = await PROVIDER.COMPANY.COMPANY_BY_OWNER(User.id)
        let department = await PROVIDER.DEPARTMENT.DEPARTMENT_BY_COMPANY(company.id)
        let {title,description,responsibility,salary,team} = req.body 
        let allow = false
        let positionDepartment = null
        await Promise.all(department.map(async (each)=>{
            let team_m = await PROVIDER.TEAM.TEAM_BY_ID(team)
            if(team_m?.department == each.id)
            {
                allow = true
                positionDepartment = each.id
            }
        }))
        
        let thisDepartment = await PROVIDER.DEPARTMENT.DEPARTMENT_BY_ID(positionDepartment)


        if(allow && positionDepartment != null)
        await  db.positions.create({
            title,
            description,
            responsibility,
            salary,
            team,
            department:positionDepartment,
            branch:thisDepartment?.branch,
            company:company.id
        })
        .then((result) => {
            RES_RESULT(result,res)
        }).catch((err) => {
            DATABASE_ERROR(err,res)
        });
        else
        NOT_FOUND_MSG("Invalid team",res)
    },
    ALL_TEAM_POSITIONS:async (req,res)=>{


        let team = req.query.id 
        let User = req.user 
        let allow = await ValidateTeam(User,team)
        if(allow)
        {
           let positions = await PROVIDER.POSITION.POSITION_BY_TEAM(team)
           RES_RESULT(positions,res) 
        }
        else
        NOT_FOUND_MSG("Invalid team",res)
        
    },
    USER_POSITIONS:async (req,res)=>{

        let User = req.user 
        let company = await PROVIDER.COMPANY.COMPANY_BY_OWNER(User.id)
        let positions = await PROVIDER.POSITION.POSITION_BY_COMPANY(company?.id)
        RES_RESULT(positions,res) 
    }
    ,
    POSiTION_DETAIL:async (req,res)=>{
        let User = req.user 
        let id = req.query.id
        let company = await PROVIDER.COMPANY.COMPANY_BY_OWNER(User.id)
        let position = await PROVIDER.POSITION.POSITION_DETAIL_COMPANY_ID(id,company.id)
        RES_RESULT(position,res)
    }

}