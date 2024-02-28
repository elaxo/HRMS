const { default: axios } = require("axios")
const { BACK_API } = require('./config/URLS');

const Auth = {headers:{Authorization: process.env.botAuth}}
module.exports = {

    Employees:async (ctx)=>{
        let Users = ctx.from
        await axios.get(`${BACK_API}/bot/user/employees?user_id=${ctx.from.id}`,Auth)
        .then((result) => {
            let toBeSend = []
            let data = result.data 
            data.map(({name,sex,phoneNumber})=>{
                toBeSend.push({name,sex,phoneNumber})
            })
            let textTo = ""
            data.map(({name,sex,phoneNumber})=>{
                    textTo = textTo+ `\n 👤${name}-${sex} \n \t 📱phone: ${phoneNumber}`
            })
            ctx.reply(textTo)
        }).catch((err) => {
            console.log(err)
        });
    },
    Requests:async(ctx)=>{

        await axios.get(`${BACK_API}/bot/user/requests?user_id=${ctx.from.id}`,Auth)
        .then((result) => {
            let link = 'https://www.main.inpowerhr.com'
            ctx.reply('You have '+result.data.length+' requests \n '+link)
        }).catch((err) => {
            console.log(err)
        });
       

    }

}
