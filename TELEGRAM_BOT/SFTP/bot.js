require('dotenv').config({path:'./.env'})
const { default: axios } = require('axios');
const { Telegraf, Markup } = require('telegraf');
const { BACK_API } = require('./config/URLS');
const express = require('express')
const bodyParser = require('body-parser');
const { Employees, Requests } = require('./Company');
const app = express()
const bot = new Telegraf(process.env.TOKEN, {telegram: { 
  parse_mode: 'HTML' 
}} );
const Auth = {headers:{Authorization: process.env.botAuth}}
const PORT = {}
app.use(bodyParser.urlencoded({ extended: false }))  //body parser
app.use(bodyParser.json())                           //body parser
PORT.reciver = require('./receiver')(app,bot)


bot.start((ctx) => {
  const userName = ctx.message.from.first_name;
  ctx.reply(`Hello, ${userName}! Welcome to the InpowerHR bot.`);
  const phoneNumberKeyboard = Markup.keyboard([
    Markup.button.contactRequest('Share Phone Number'),
  ]).resize();

  ctx.reply('To verify and link your Telegram account with our system, we kindly request you to share your phone number', phoneNumberKeyboard);

});


bot.on('contact', async (ctx) => {
  
  const menuKeyboard = Markup.keyboard([
    ['Menu'],
  ]).resize();

    const {phone_number, first_name,last_name,user_id } = ctx.message.contact; 
   await axios.post(`${BACK_API}/bot/user`,{phone_number, first_name,last_name,user_id},Auth)
    .then((result) => {
        
        ctx.reply(`👍👍 Congratulation! ${first_name}! Your Telegram account has been successfully connected to our system`,menuKeyboard);                

    }).catch((err) => {
      console.log(err)
        ctx.reply(`😔😔 Sorry, ${first_name}! it seems that your phone number is not registered in our system. Please use the Telegram account that is associated with the phone number registered in our system..`);        
    });


  });

// Help command handler
// bot.help((ctx) => {
//   ctx.reply('This is a simple bot. You can send messages and interact with it.');
// });

// // Echo text handler
bot.on('text', async (ctx) => {

  const receivedText = ctx.message.text;
  if(receivedText == "Menu")
  {
    let User = ctx.from
    await axios.get(`${BACK_API}/bot/define/user?user_id=${User.id}`,Auth)
    .then((result) => {
      if(result.data == "COMPANY")
      {
        const companyKeyboard = Markup.keyboard([
          ['Requests','My Employees','Company'],
        ]).resize();
        ctx.reply("---------",companyKeyboard)
      }
      else if(result.data == "EMPLOYEE")
      {
        const companyKeyboard = Markup.keyboard([
          ['Leave Request','My Projects','My Company Profile'],
        ]).resize();
        ctx.reply("---------",companyKeyboard)
      }
      else 
      ctx.reply("❌sorry something wrong we will fix it❌")
    }).catch((err) => {
      console.log(err.data)
      ctx.reply("❌sorry something wrong we will fix it❌")
      
    });
  }
  else if(receivedText == "My Employees")
  Employees(ctx)
  else if(receivedText == "Leave Request")
  ctx.reply("Your leave requests are under review")
  else if(receivedText == "Requests")
  Requests(ctx)
  else if(receivedText == "My Projects")
  ctx.reply("Currently you are not assigned to any projects")
  else
  ctx.reply("Waiting for company information.........")

  
  
});

bot.launch(()=>{
    console.log('Bot is running');    
}).then(() => {
  console.log('Bot is running');
}).catch((err) => {
  console.error('Error starting bot', err);
});
app.listen(1223,()=>{
  console.log("Bot is running and receiving on port 1223")
})