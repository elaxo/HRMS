const db = require('../models')
const PROVIDER = require('../provider')
const { RES_RESULT, NOT_FOUND_MSG } = require('../service/responses')


module.exports = {
    USER_BRANCHES_LIST:async (req,res)=>{
        let User = req.user 
        RES_RESULT(await PROVIDER.BRANCH.BRANCH_BY_USER(User.id),res)
    },
    SINGLE_BRANCH_DETAIL:async (req,res)=>{
        let id = req.query.id 
        if(id != null)
        {
            let branch = await PROVIDER.BRANCH.BRANCH_BY_ID(id)
            RES_RESULT(branch,res)
        }
        else
        NOT_FOUND_MSG("Required parm not found",res)
    }
}