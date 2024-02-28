const db = require('../models')
const { RES_RESULT } = require('../service/responses')
module.exports = {

    HOLIDAYS: async (req,res)=>{

        let Calendar = await db.calendar.findAll({raw:true})
        RES_RESULT(Calendar,res)

    }

}