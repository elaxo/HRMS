
module.exports = (sequelize, DataTypes) => {

    return sequelize.define('employees', {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        avatar:{
            type:DataTypes.STRING,
            allowNull:true,
            defaultValue:"default.png"

        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sex: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateOfBirth: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nationality: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tinNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        secondaryPhoneNumber: {
            type: DataTypes.STRING,
            allowNull: true
        },
        BankAccount: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: {}
        },
        martialStatus: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: {}
        },
        children: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        emergencyContact: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: {}
        },
        nextOfKeen: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: {}
        },
        workExperience: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: []
        },
        certification: {
            type: DataTypes.STRING,
            allowNull: true
        },
        educationalDocument: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })


}