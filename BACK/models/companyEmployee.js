module.exports = (sequelize,DataTypes)=>{
    return sequelize.define("companyEmployee",{
        id:{
        autoIncrement:true,
        type:DataTypes.INTEGER,
        primaryKey: true,
        allowNull:true,
        },
        profileId:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        companyId:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        position:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        isCurrentlyWork:{
            type:DataTypes.BOOLEAN,
            allowNull:true,
            defaultValue:true
        },
        extraForms:{
            type:DataTypes.JSON,
            allowNull:true
        }
    })
}