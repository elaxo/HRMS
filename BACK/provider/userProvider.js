const db = require('../models');
const { Info } = require('../service/debug');

module.exports = {
    USER_BY_ID:async (id)=>{
        if(id != null)
        return await db.Users.findOne({where:{id:id},raw:true})
        else 
        return null
    },
    USER_BY_EMAIL:async (email)=>{
        if(email != null)
        return await db.Users.findOne({where:{email:email},raw:true,attributes:["id","firstName","password","lastName","sex","address","email","phone","role","userType","createdAt","updatedAt"] })
        else
        return null
    },
    USER_BY_PHONE:async (phone)=>{
        if(phone != null)
        return await db.Users.findOne({where:{phone:phone},raw:true})
        else
        return null
    }
}

