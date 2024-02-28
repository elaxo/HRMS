const db = require('../models')


module.exports = {

    EMPLOYEE_BY_USERID:async (id)=>{
            if(id == null)
            return null
            else
            return await db.Employees.findOne({where:{userId:id},raw:true})
    }

}