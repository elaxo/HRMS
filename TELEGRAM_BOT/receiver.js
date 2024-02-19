const {Markup} = require('telegraf')
module.exports = (app,bot)=>{



    const emplyeeKeyboard = Markup.keyboard([
        ['Profile'],
      ]).resize();

    const employerKeyboard = Markup.keyboard([
        ['Company'],
      ]).resize();
    



    const BLOCK_ACCESS = (res)=>res.status(403).json({msg:"ACCESS_DENIED"})
    let Auth = (req,res,next)=>{
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

app.post('/send/notification',Auth,(req,res)=>{
    let {user_id,msg,role} = req.body
    if(role == "empr")
    bot.telegram.sendMessage(user_id, msg,employerKeyboard);
    else
    bot.telegram.sendMessage(user_id, msg,emplyeeKeyboard);

})



}