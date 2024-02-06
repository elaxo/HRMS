require('dotenv').config({path:'./.env'})
const { default: axios } = require('axios');
const { Telegraf, Markup } = require('telegraf');
const { BACK_API } = require('./config/URLS');

// Create a new instance of Telegraf bot
const bot = new Telegraf(process.env.TOKEN);

const header = process.env.secret

// Start command handler
bot.start((ctx) => {
  const userName = ctx.message.from.first_name;
  ctx.reply(`Hello, ${userName}! Welcome to the bot.`);
  const phoneNumberKeyboard = Markup.keyboard([
    Markup.button.contactRequest('Share Phone Number'),
  ]).resize();
  ctx.reply('Please share your phone number:', phoneNumberKeyboard);

});

//bot.telegram.sendMessage(1714668883, "Hulk");
bot.on('contact', async (ctx) => {

    const {phone_number, first_name,last_name,user_id } = ctx.message.contact;
    console.log(phone_number)
    
   await axios.post(`${BACK_API}/bot/user`,{phone_number, first_name,last_name,user_id})
    .then((result) => {
        
        ctx.reply(`👍👍 Congratulation! ${first_name}! Your Telegram account has been successfully connected to our system`);                

    }).catch((err) => {
        ctx.reply(`😔😔 Sorry, ${first_name}! it seems that your phone number is not registered in our system. Please use the Telegram account that is associated with the phone number registered in our system..`);        
    });


  });

// Help command handler
// bot.help((ctx) => {
//   ctx.reply('This is a simple bot. You can send messages and interact with it.');
// });

// // Echo text handler
// bot.on('text', (ctx) => {
//   const receivedText = ctx.message.text;
//   ctx.reply(`You said: ${receivedText}`);
// });

// Start the bot
bot.launch(()=>{
    console.log('Bot is running');    
}).then(() => {
  console.log('Bot is running');
}).catch((err) => {
  console.error('Error starting bot', err);
});