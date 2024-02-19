module.exports = (sequelize,DataTypes)=>{
    return sequelize.define("departments",{
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
     company:{
        type:DataTypes.INTEGER
     },
     branch:{
        type:DataTypes.INTEGER,
        allowNull:true
     },
     head:{
        type:DataTypes.INTEGER,
        allowNull:true
     },
     productService:{
        type:DataTypes.TEXT,
        allowNull:false
     },
     isBranch:{
        type:DataTypes.BOOLEAN,
        allowNull:false
     }
    })
}