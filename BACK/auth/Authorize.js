const jwt = require("jsonwebtoken");
const { RES_RESULT, BLOCK_ACCESS } = require("../service/responses")
const userRoutes = require('./userRoutes.json')
module.exports = {

    userAuth:async (req,res,next)=>{

        let gate = req.path 
        let pass = false;
        userRoutes.map((each)=>{
                if(gate == each)
                pass = true
        })
        if(pass)
        {
            let authorizationHeader = req.headers?.authorization
            if(authorizationHeader == null || authorizationHeader == undefined)
            BLOCK_ACCESS(res)
            else
            {
                let token = authorizationHeader.split(' ')[1]        
                await jwt.verify(token,process.env.privateKey,async (err,decode)=>{
                if(err)
                BLOCK_ACCESS(res)
                else 
                {
                 req.user = decode
                 next()
                }});
            }
        
        }
        else
        BLOCK_ACCESS(res)
    },
    botAuth:(req,res,next)=>{
        let authorizationHeader = req.headers?.authorization 
        if(authorizationHeader == null || authorizationHeader == undefined)
        BLOCK_ACCESS(res)
        else 
        {
            if(authorizationHeader == process.env.botAuth)
            next()
            else
            BLOCK_ACCESS(res)
        }



    }
}