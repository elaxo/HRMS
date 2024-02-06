const dbConfig = require('../config/dbConfig')
const {DataTypes,Sequelize} = require('sequelize');
const { Info, InfoObject, ErrorObject } = require('../service/debug');


const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PWD,{host:dbConfig.HOST,dialect:dbConfig.DIAL})
sequelize.authenticate()
.then((result) => {
    Info("Database successfully connected!")
}).catch((err) => {
    ErrorObject("Database connection failed!",err)
});


const db = {}
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Users = require('./Users')(sequelize,DataTypes)
db.Employees = require('./employee')(sequelize,DataTypes)
db.TelegramUser = require('./TelegarmUser')(sequelize,DataTypes)














db.sequelize.sync({force:false}).then(()=>Info("Database sync success!")).catch((err)=>ErrorObject("Database sync failed",err))



module.exports = db