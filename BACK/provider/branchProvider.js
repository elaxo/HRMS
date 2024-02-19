const db = require('../models')


module.exports = {

    BRANCH_BY_USER:async (userId)=>{
        if(userId != null)
        return await db.branch.findAll({where:{ownUser:userId},raw:true})
        else 
        return []
    },
    BRANCH_BY_ID:async (id)=>{
        if(id != null)
        return await db.branch.findOne({where:{id:id},raw:true})
        else 
        return null
    }

}