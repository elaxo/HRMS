module.exports = (sequelize,DataTypes)=>{

    return sequelize.define("telegramUser",{
        userId:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        },
        phone_number:{
            type:DataTypes.STRING,
            allowNull:false
        }, 
        first_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        last_name:{
            type:DataTypes.STRING,
            allowNull:true
        },
        user_id :{
            type:DataTypes.BIGINT,
            allowNull:false
        }

    })

}