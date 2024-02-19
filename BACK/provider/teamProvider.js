const db = require('../models')



module.exports = {

    TEAM_BY_DEPARTMENT:async (depId)=>{

        if(depId != null)
        return await db.teams.findAll({where:{department:depId},raw:true})
        else
        return []
    },
    TEAM_BY_ID:async (teamId)=>{
        return await db.teams.findOne({where:{id:teamId},raw:true})
    },
    TEAM_BY_ALL:async (compId)=>{
        return await db.teams.findAll({where:{company:compId}})
    }

}