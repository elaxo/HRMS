module.exports = (sequelize,DataTypes)=>{

    return sequelize.define("Breaks",{
        
        id:{
        autoIncrement:true,
        type:DataTypes.INTEGER,
        primaryKey: true,
        allowNull:true,
        },
        requestId:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        type:{
            type:DataTypes.STRING,
            allowNull:false
        },
        totalDays:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        SalaryInformation:{
            type:DataTypes.STRING,
            allowNull:false
        },
        reason:{
            type:DataTypes.TEXT,
            allowNull:true
        },
        userId:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        company:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        startDate:{
            type:DataTypes.DATE,
            allowNull:false,
        },
        endDate:{
            type:DataTypes.DATE,
            allowNull:false
        },
        isEnd:{
            type:DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        }
    })


}