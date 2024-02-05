const { ErrorObject } = require("./debug")
const { SERVER_ERROR } = require("./responses")

module.exports = {

    DATABASE_ERROR:(err,res)=>{
        ErrorObject("ERROR FOUND:",err)
        SERVER_ERROR(res)
    }

}