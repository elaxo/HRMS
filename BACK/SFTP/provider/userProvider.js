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
        return await db.Users.findOne({where:{email:email},raw:true})
        else
        return null
    },
    USER_BY_PHONE:async (phone)=>{
        if(phone != null)
        return await db.Users.findOne({where:{phone:phone},raw:true})
        else
        return null
    },
    TELEGRAM_USER_BY_USER:async(userId)=>{
        if(userId == null)
        return null
        else 
        return await db.TelegramUser.findOne({where:{userId:userId},raw:true})
    },
    EMPLOYEE_PROFILE_BY_USER:async (userId)=>{
        if(userId == null)
        return null
        else 
        return await db.Employees.findOne({where:{userId:userId},raw:true})
    }
}

