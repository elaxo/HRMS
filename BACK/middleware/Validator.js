const Joi = require("joi");
const { NOT_FOUND_MSG, RES_RESULT, ERROR_FOUND } = require("../service/responses");
const PROVIDER = require("../provider");

module.exports = {
        CREATE_USER_VALIDATOR: async (req,res,next)=>{
            const schema = Joi.object({
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                sex: Joi.string().valid('male', 'female', 'other').required(),
                address: Joi.string().required(),
                email: Joi.string().email().required(),
                phone: Joi.string().required(),
                password: Joi.string().min(8).required()
              });
              let data = req.body
              const { error, value } = schema.validate(data);
              if(error) 
              NOT_FOUND_MSG((error.details[0].message).replace(/\\/g, '').replace(/"/g, ''),res)
              else
              {
                let email = await PROVIDER.USER.USER_BY_EMAIL(data.email)
                let phone = await PROVIDER.USER.USER_BY_PHONE(data.phone)
                if(email != null)
                ERROR_FOUND("Email address already exist",res)
                else if(phone != null)
                ERROR_FOUND("Phone number already exist",res)
                else 
                next()
              }
            },
            LOGIN_USER:(req,res,next)=>{
              let data = req.body 
              const scheme = Joi.object({
               email:Joi.string().required(),
               password:Joi.string().required()
              })
              let {error,value} = scheme.validate(data)
              if(error)
              NOT_FOUND_MSG((error.details[0].message).replace(/\\/g, '').replace(/"/g, ''),res)
              else
              next()
            }
}