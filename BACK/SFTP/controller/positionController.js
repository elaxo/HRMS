const db = require('../models');
const PROVIDER = require('../provider');
const { SEND_TELEGRAM_NOTIFICATION } = require('../provider/botProvider');
const { Obj, Info } = require('../service/debug');
const { DATABASE_ERROR } = require('../service/error_handler');
const { RES_RESULT, NOT_FOUND_MSG, SUCCESS_MSG } = require('../service/responses');

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

    CREATE_POSITION_TEAM:async (req,res)=>{
        let User = req.user 
        let company = await PROVIDER.COMPANY.COMPANY_BY_OWNER(User.id)
        let department = await PROVIDER.DEPARTMENT.DEPARTMENT_BY_COMPANY(company.id)
        let {title,description,responsibility,salary,team,benefit,dayOff,annualLeave} = req.body 
        let allow = false
        let positionDepartment = null
        if(team != undefined)
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
            benefit,dayOff,annualLeave,
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
    CREATE_POSITION_DEPARTMENT:async (req,res)=>{
        let {title,description,responsibility,salary,benefit,department,dayOff,annualLeave} = req.body 
        let User = req.user 
        let company = await PROVIDER.COMPANY.COMPANY_BY_OWNER(User.id)
        if(company != null)
        {
            let dbDepartment = await PROVIDER.DEPARTMENT.DEPARTMENT_BY_COMPANY(company.id)
            let allow = false;
            let branch = null;
            dbDepartment.map((each)=>{
                if(each.id == department)
                {
                    allow = true
                    branch = each.branch
                }
            })
            if(allow)
            await db.positions.create({title,description,benefit,responsibility,salary,department:parseInt(department),dayOff,annualLeave,company:company.id,branch:branch})
            .then((result) => {
                RES_RESULT(result,res)
            }).catch((err) => {
                DATABASE_ERROR(err,res)
            });
            else 
            NOT_FOUND_MSG("Invalid department")

       }
       else 
       NOT_FOUND_MSG("Company not found",res)

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
        if(id == undefined)
        id = null
        let company = await PROVIDER.COMPANY.COMPANY_BY_OWNER(User.id)
        let position = await PROVIDER.POSITION.POSITION_DETAIL_COMPANY_ID(id,company.id)
        RES_RESULT(position,res)
    },
    EMPLOYEE_POSITION_DETAIL:async (req,res)=>{
        let User = req.user 
        let id = req.query.id
        Obj(req.query)
        if(id == null || id == undefined)
        NOT_FOUND_MSG("Required filed missing!",res)
        else 
        {
            let company = await PROVIDER.COMPANY.COMPANY_BY_OWNER(User.id)
            let employee = await PROVIDER.COMPANY.COMPANY_EMPLOYEE_DETAIL(id,company.id)
            Obj(employee)
            if(employee == null)
            NOT_FOUND_MSG("Employee not found",res)
            else 
            {
                let positionDetail = await PROVIDER.POSITION.POSITION_BY_ID(employee.position)
                RES_RESULT(positionDetail,res)
            }
        }
    },
    UPDATE_EMPLOYEE:async (req,res)=>{
      let employee = req.query.id;
      let {position} = req.body 
      let User = req.user 
      if(employee == undefined || position == undefined)
      NOT_FOUND_MSG("Required filed missing",res)
      else 
      {
        let company = await PROVIDER.COMPANY.COMPANY_BY_OWNER(User.id)
        if(company != null)
        {
            await db.CompanyEmployee.update({position:position},{where:{profileId:employee,companyId:company.id}})
            .then(async (result) => {
                if(result[0] == 1)
                {
                    SUCCESS_MSG("Updated",res)
                    await SEND_TELEGRAM_NOTIFICATION(employee)
                
                }
                else 
                NOT_FOUND_MSG("ERROR FOUND",res)
            }).catch((err) => {
                DATABASE_ERROR(err,res)
            });
        }
      }    
    }

}