const jwt = require('jsonwebtoken');
const { USER_LOGIN } = require('../auth/auth');
const db = require('../models');
const { Info, Obj } = require('../service/debug');
const encrypt = require('../service/encrypt');
const { DATABASE_ERROR } = require('../service/error_handler');
const { RES_RESULT, ERROR_FOUND, BLOCK_ACCESS, SUCCESS_MSG, SERVER_ERROR } = require('../service/responses');
const { USER_BY_EMAIL, EMPLOYEE_PROFILE_BY_USER } = require('../provider/userProvider');
const { SEND_TELEGRAM_NOTIFICATION } = require('../provider/botProvider');
const PROVIDER = require('../provider');

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
    VALIDATE_USER:async (req,res)=>{
        let {payload} = req.body 
        if(payload == null || payload == undefined)
        BLOCK_ACCESS(res)
        else 
    {  // Verify the token
        try {
            const decodedToken = jwt.verify(payload, process.env.privateKey)
            if(decodedToken)
            {
                let user = await USER_BY_EMAIL(decodedToken.email)
                delete user["password"]
                RES_RESULT(user,res)
            }
        } catch (error) {
            BLOCK_ACCESS(res)
        }
        }
    },
    VALIDATE_USER_EMAIL:async(req,res)=>{
        let {payload} = req.body 
        if(payload == null || payload == undefined)
        BLOCK_ACCESS(res)
        else
        {  // Verify the token
            try {
                const decodedToken = jwt.verify(payload, process.env.privateKey)
                if(decodedToken)
                {
                    let pendIngUser = await PROVIDER.PENDING_EMPLOYEE.PENDING_EMPLOYEE_BY_EMAIL(decodedToken.data.email)
                    if(pendIngUser == null || pendIngUser == undefined)
                    BLOCK_ACCESS(res)
                    else 
                    {
                        if(pendIngUser.isRegistered == 0)
                        {
                            await db.Users.create({
                                firstName:pendIngUser.firstName,
                                lastName:pendIngUser.lastName,
                                sex:pendIngUser.sex,
                                address:pendIngUser.address,
                                email:pendIngUser.email,
                                phone:pendIngUser.phone, 
                                role:1                       
                            })
                            .then(async(result) => {
                               let User = await PROVIDER.USER.USER_BY_ID(result.id) 
                                jwt.sign(User,process.env.privateKey,{expiresIn:"5h"},(error,token)=>{
                                    if(error)
                                   DATABASE_ERROR(error,res)
                                    else
                                    RES_RESULT({token:token},res)
                                })                                                                                 
                            }).catch((err) => {
                                DATABASE_ERROR(err,res)
                            });
                        }
                        else
                        BLOCK_ACCESS(res)
                    }
                }
            } catch (error) {
                BLOCK_ACCESS(res)
            }
            }
    },
    CREATE_EMPLOYEE_PROFILE:async (req,res)=>{
        let data = req.body 
        let user = req.user 
        data.userId = user.id 
        data.name = user.firstName+" "+user.lastName
        data.sex = user.sex 
        data.phoneNumber = user.phone
        await db.Employees.create(data)
        .then(async (employee) => {
            await db.Users.update({role:2,userType:2},{where:{id:user.id}})
            .then((result) => {
                RES_RESULT(employee,res)
                SEND_TELEGRAM_NOTIFICATION(user.id,`${user.firstName} Your employee profile has been successfully created.`)
            }).catch((err) => {
                DATABASE_ERROR(err,res)                
            });
        }).catch((err) => {
            DATABASE_ERROR(err,res)
        });

    },
    EMPLOYEE_PROFILE:async (req,res)=>{
        let user = req.user 
        let Profile = await EMPLOYEE_PROFILE_BY_USER(user.id)
        RES_RESULT(Profile,res)
    },
    UPLOAD_AVATAR:async (req,res)=>{
        let fileName = req.fileName
        let User = req.user 
        await db.Employees.update({'avatar':fileName},{where:{userId:User.id}})
        .then((result) => {
            SUCCESS_MSG("Updated",res)
        }).catch((err) => {
            DATABASE_ERROR(err,res)
        });
    },
    UPLOAD_DOCUMENT: async (req,res)=>{

        let fileName = req.fileName 
        let User = req.user 
        await db.Employees.update({educationalDocument:fileName},{where:{userId:User.id}})
        .then((result) => {
            SUCCESS_MSG("Updated",res)
        }).catch((err) => {
            DATABASE_ERROR(err,res)
        });
        

    },
    CREATE_PASSWORD:async (req,res)=>{    
        let User = req.user 
        let isUser = await PROVIDER.USER.USER_BY_ID(User.id)
        let data = req.body
        if(isUser.password == null)
        {
            let password = encrypt.password_hash(data.password)
            await db.pendingEmployee.update({isRegistered:true},{where:{email:User.email}})
            let pendingUser = await PROVIDER.PENDING_EMPLOYEE.PENDING_EMPLOYEE_BY_EMAIL(User.email)
            await db.CompanyEmployee.create({
                profileId:User.id,
                companyId:pendingUser.company,
                position:pendingUser.position
                })
            await db.Users.update({password:password},{where:{id:User.id}})
            .then((result) => {
                if(result[0] != 0)
                SUCCESS_MSG("password created successfully",res)
                else
                ERROR_FOUND("Error found",res)
            }).catch((err) => {
                DATABASE_ERROR(err,res)
            });
        }
        else
        ERROR_FOUND("User already have a password",res)
        
    }



}