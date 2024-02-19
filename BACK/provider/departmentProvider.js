const db = require('../models')
const { Info } = require('../service/debug')


module.exports = {


    DEPARTMENT_BY_COMPANY:async (compId)=>{
        if(compId != null)
        return await db.department.findAll({where:{company:compId}})
        else
        return []
    },
    DEPARTMENT_BY_ID:async (depId)=>{
        if(depId != null)
        return await db.department.findOne({where:{id:depId},raw:true})
        else 
        return null
    }

}