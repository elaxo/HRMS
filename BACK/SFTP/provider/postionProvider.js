const db = require('../models')


module.exports = {

    POSITION_BY_TEAM: async (teamId)=>{
        return await db.positions.findAll({where:{team:teamId},raw:true})
    },
    POSITION_BY_COMPANY: async (company)=>{
        return await db.positions.findAll({where:{company:company},raw:true})
    },
    POSITION_DETAIL_COMPANY_ID:async (id,company)=>{
        return await db.positions.findOne({where:{id:id,company:company},raw:true})
    },
    POSITION_BY_ID:async (id)=>await db.positions.findOne({where:{id:id},raw:true})
    


}