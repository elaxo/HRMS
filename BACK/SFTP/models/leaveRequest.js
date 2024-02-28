module.exports = (sequelize,DataTypes)=>{

    return sequelize.define("leaveRequest",{
        id:{
        autoIncrement:true,
        type:DataTypes.INTEGER,
        primaryKey: true,
        allowNull:true,
        },
        userId:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        company:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        type:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        startDate:{
            type:DataTypes.DATE,
            allowNull:false
        },
        endDate:{
            type:DataTypes.DATE,
            allowNull:false
        },
        additionalType:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        reason:{
            type:DataTypes.TEXT,
            allowNull:true
        },
        comment:{
            type:DataTypes.TEXT,
            allowNull:true
        },
        file:{
            type:DataTypes.STRING,
            allowNull:true
        },
        status:{
            type:DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0

        }
    })
}