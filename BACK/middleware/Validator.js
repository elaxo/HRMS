const Joi = require("joi");
const { NOT_FOUND_MSG, RES_RESULT, ERROR_FOUND } = require("../service/responses");
const PROVIDER = require("../provider");
const { EMPLOYEE_BY_USERID } = require("../provider/EmployeeProvider");
const { Obj } = require("../service/debug");
const {COMPANY} = require('../provider')
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
            },












            CREATE_EMPLOYEE_VALIDATOR:async (req,res,next)=>{
              let data = req.body 
              Obj(data)
              const scheme = Joi.object({
                dateOfBirth: Joi.string().required(),
                address: Joi.string().required(),
                nationality: Joi.string().required(),
                idNumber: Joi.string().required(),
                tinNumber: Joi.string().allow(""),
                secondaryPhoneNumber: Joi.string().allow(""),
                BankAccount: Joi.object().required(),
                martialStatus: Joi.object().default({}),
                children: Joi.boolean().required().default(false),
                emergencyContact: Joi.object().optional().default({}),
                nextOfKeen: Joi.object().optional().default({}),
                workExperience: Joi.array().required(),
                certification: Joi.string().allow(null),
                educationalDocument: Joi.string().allow(null),
              });

              let {error,value} = scheme.validate(data)
              if(error)
              NOT_FOUND_MSG((error.details[0].message).replace(/\\/g, '').replace(/"/g, ''),res)
              else
              {
                let user = req.user 
                let empProfile =await EMPLOYEE_BY_USERID(user.id)
                if(empProfile != null)
                ERROR_FOUND("You already have an employer profile",res)
                else 
                next()
              }
            },










            CREATE_COMPANY_VALIDATOR:async (req,res,next)=>{

              const companyValidator = Joi.object({
                companyName: Joi.string().required(),
                industry: Joi.string().required(),
                businessDescription: Joi.string().required(),
                companySize: Joi.string().required(),
                location: Joi.string().required(),
                isBranch: Joi.boolean().required(),
                branchs: Joi.array().required()
              });
              
              // Example usage
              const data = req.body
              const { error, value } = companyValidator.validate(data);              
              if (error) {
                NOT_FOUND_MSG((error.details[0].message).replace(/\\/g, '').replace(/"/g, ''),res)
              } 
              
              else 
              {
                let ownUser = req.user.id 
                let Company = await COMPANY.COMPANY_BY_OWNER(ownUser)
                if(Company == null)
                next()
                else
                ERROR_FOUND("One user can only have one company and many branches",res)
                
              }

            }


}