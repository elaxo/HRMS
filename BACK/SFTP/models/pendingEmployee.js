module.exports = (sequelize,DataTypes)=>{

    return sequelize.define("pendingEmployee",{
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
            allowNull:true,
        },
        address:{
            type:DataTypes.STRING,
            allowNull:true
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        phone:{
            type:DataTypes.STRING,
            allowNull:true
        },
        position:{
        type:DataTypes.INTEGER,
        allowNull:false
        },
       company:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        startDate:{
            type:DataTypes.DATE,
            allowNull:false
        },
        token:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        isRegistered: {
            type:DataTypes.BOOLEAN,
            allowNull:true,
            defaultValue:false
        }
    })

}