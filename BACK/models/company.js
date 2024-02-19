module.exports = (sequelize,DataTypes)=>{

    return sequelize.define("company",{
            id:{
            autoIncrement:true,
            type:DataTypes.INTEGER,
            primaryKey: true,
            allowNull:true,
            },
            companyName: {
                type:DataTypes.STRING,
                allowNull:false
            },
            industry: {
                type:DataTypes.STRING,
                allowNull:false                
            },
            businessDescription: {
                type:DataTypes.STRING,
                allowNull:false
            },
            companySize: {
                type:DataTypes.STRING,
                allowNull:false
            },
            location: {
                type:DataTypes.STRING,
                allowNull:false
            },
            isBranch:{
                type:DataTypes.BOOLEAN,
                allowNull:false
            },
            ownUser:{
                type:DataTypes.INTEGER,
                allowNull:false
            }
            })

}