const jwt = require('jsonwebtoken')
const { NOT_FOUND_MSG, RES_RESULT, BLOCK_ACCESS, SERVER_ERROR } = require('../service/responses')
const PROVIDER = require('../provider')
const encrypt = require('../service/encrypt')
const { Info, Obj } = require('../service/debug')

module.exports = {

    USER_LOGIN: async(user,password,res)=>{
        if(user == null || password == null)
        NOT_FOUND_MSG("Email or phone required",res)
        else if(password == null)
        NOT_FOUND_MSG("Password required",res)
        else 
        {
            let loginUser = await PROVIDER.USER.USER_BY_EMAIL(user.email)

            if(user.email != null && loginUser != null)
            {
                let isValid = await encrypt.password_check(password,loginUser.password)
                if(isValid)
                {
                    let newUser = loginUser
                    delete newUser["password"]
                    jwt.sign(newUser,process.env.privateKey,{expiresIn:"5h"},(error,token)=>{
                            if(error)
                            SERVER_ERROR(error,res)
                            else
                            RES_RESULT({token:token},res)
                        })                 
                
                    }
                else
                BLOCK_ACCESS(res)                
            }
            else
            BLOCK_ACCESS(res)                
        }       
    }

}