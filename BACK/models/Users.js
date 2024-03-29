module.exports = (sequelize,DataTypes)=>{
    
    return sequelize.define("users",{
        id:{
        autoIncrement:true,
        type:DataTypes.INTEGER,
        primaryKey: true,
        allowNull:true,
        },
        firstName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        lastName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        sex:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        address:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        phone:{
            type:DataTypes.STRING,
            allowNull:true
        },
        password:{
            type:DataTypes.STRING,
            allowNull:true
        },
        role:{
            type:DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        },
        userType:{
            type:DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        }
    })
}