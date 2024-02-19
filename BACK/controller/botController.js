const db = require("../models")
const { USER_BY_PHONE } = require("../provider/userProvider")
const { Obj } = require("../service/debug")
const { DATABASE_ERROR } = require("../service/error_handler")
const { ERROR_FOUND, SUCCESS_MSG } = require("../service/responses")



module.exports = {

    CREATE_TELEGRAM_USER: async (req,res)=>{
        let telegramUser = req.body 
        let user = await USER_BY_PHONE(telegramUser.phone_number)
        
        if(user == null)
        ERROR_FOUND("User_not found",res)
        else 
        {
        let find = await db.TelegramUser.findOne({where:{userId:user.id},raw:true})
        if(find == null)
        {
            telegramUser.userId = user.id
            await db.TelegramUser.create(telegramUser)
            .then((result) => {
                SUCCESS_MSG("CREATED",res)
            }).catch((err) => {
                DATABASE_ERROR(err,res)
            });

        }
        else 
        SUCCESS_MSG("already created",res)
        }
    }

}