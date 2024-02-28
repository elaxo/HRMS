 module.exports = (sequelize,DataTypes)=>{

    return sequelize.define("position",{

        id:{
        autoIncrement:true,
        type:DataTypes.INTEGER,
        primaryKey: true,
        allowNull:true,
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false
        },
        description:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        responsibility: {
            type:DataTypes.TEXT,
            allowNull:false
        },
        salary:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        dayOff:{
            type:DataTypes.JSON,
            allowNull:true,
            defaultValue:[0]
        },
        benefit:{
            type:DataTypes.STRING,
            allowNull:true
        },
        annualLeave:{
            type:DataTypes.INTEGER,
            allowNull:true,
            defaultValue:16
        },
        team:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        branch:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        department:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        company:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    })

 }