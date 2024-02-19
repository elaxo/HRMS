const db = require('../models')
const { Info } = require('../service/debug')




module.exports = {
    COMPANY_BY_OWNER: async (ownId)=>{
        if(ownId != null)
        return await db.Company.findOne({where:{ownUser:ownId},raw:true})
        else 
        return null
    },
    COMPANY_BY_COMPANY_ID:async (id)=>{
        return await db.Company.findOne({where:{id:id},raw:true})
    },
    COMPANY_EMPLOYEES:async (compId)=>{
        return await db.CompanyEmployee.findAll({where:{companyId:compId},raw:true})
    }
}