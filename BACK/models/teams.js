module.exports = (sequelize,DataTypes)=>{

    return sequelize.define("teams",{
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
        description:{
            type:DataTypes.STRING,
            allowNull:false
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