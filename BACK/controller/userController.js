const jwt = require('jsonwebtoken');
const { USER_LOGIN } = require('../auth/auth');
const db = require('../models');
const { Info, Obj } = require('../service/debug');
const encrypt = require('../service/encrypt');
const { DATABASE_ERROR } = require('../service/error_handler');
const { RES_RESULT, ERROR_FOUND, BLOCK_ACCESS, SUCCESS_MSG } = require('../service/responses');
module.exports = {

    CREATE_USER:async (req,res)=>{
        let data = req.body
        let plainPassword = req.body.password
        data.password = encrypt.password_hash(data.password)
        await db.Users.create(data)
        .then((result) =>USER_LOGIN(result,plainPassword,res))
        .catch((err) =>DATABASE_ERROR(err,res))        
    },
    LOGIN_USER:async (req,res)=>{
        let data = req.body
        await USER_LOGIN(data,data.password,res)
    },
    VALIDATE_USER:(req,res)=>{
        let {payload} = req.body 
        if(payload == null || payload == undefined)
        BLOCK_ACCESS(res)
        else 
    {  // Verify the token
        try {
            const decodedToken = jwt.verify(payload, process.env.privateKey)
            if(decodedToken)
            RES_RESULT(decodedToken,res)
        } catch (error) {
            BLOCK_ACCESS(res)
        }
        }

    }



}