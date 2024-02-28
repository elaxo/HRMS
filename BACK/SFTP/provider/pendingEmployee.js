const db = require('../models')


module.exports = {

    PENDING_EMPLOYEE_BY_EMAIL:async (email)=>{
        return await db.pendingEmployee.findOne({where:{email:email},raw:true})
    },
    PENDING_EMPLOYEE_BY_PHONE:async (phone)=>{
        return await db.pendingEmployee.findOne({where:{phone:phone},raw:true})
    },
    PENDING_EMPLOYEE_BY_COMPANY:async (compId)=>{
        return await db.pendingEmployee.findAll({where:{company:compId},raw:true})
    }
}
