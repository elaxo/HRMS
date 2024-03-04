const db = require('../models')



module.exports = {

    Holydays: async ()=>{
        let calendar =  await db.calendar.findAll()
        console.log("Calendar",calendar)
        return calendar
    }

}