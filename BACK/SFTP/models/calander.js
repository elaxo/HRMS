module.exports = (sequelize,DataTypes)=>{

    return sequelize.define("calendar",{
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
        date:{
            type:DataTypes.DATE,
            allowNull:false
        }

    })
}