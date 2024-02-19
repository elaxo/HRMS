module.exports = (sequelize,DataTypes)=>{
    return sequelize.define("Branches",{
        id:{
        autoIncrement:true,
        type:DataTypes.INTEGER,
        primaryKey: true,
        allowNull:true,
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        ownUser:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        company:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
        })
}