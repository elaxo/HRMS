const { default: axios } = require("axios")
const { TELEGRAM_USER_BY_USER, USER_BY_ID } = require("./userProvider")
const { ErrorObject, Info } = require("../service/debug")
const Auth = {headers:{Authorization: process.env.botAuth}}


module.exports = {


    SEND_TELEGRAM_NOTIFICATION:async (userId,msg)=>{

        let USER = await TELEGRAM_USER_BY_USER(userId)
        let UserRole = await USER_BY_ID(userId)

        if(USER != null && msg != "")
        {
            if(UserRole.role == 111)
            await axios.post(process.env.botReceiver+"/send/notification",{user_id:USER.user_id,msg:msg,role:"empr"},Auth)
            .then((result) => {                
            }).catch((err) => {
                ErrorObject(err)
            });
            else
            await axios.post(process.env.botReceiver+"/send/notification",{user_id:USER.user_id,msg:msg,role:"emp"},Auth)
            .then((result) => {                
            }).catch((err) => {
                ErrorObject(err)
            });


        }
    }

}