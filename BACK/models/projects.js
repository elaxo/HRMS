module.exports = (sequelize,DataTypes)=>{
    return  sequelize.define('Project', {
        id:{
        autoIncrement:true,
        type:DataTypes.INTEGER,
        primaryKey: true,
        allowNull:true,
        },
        company:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
      projectName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      projectDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      projectManager: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      projectScope: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      projectGoals: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      projectTimeline: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      projectBudget: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      projectDeliverables: {
        type: DataTypes.TEXT,
        allowNull: false,
      }
    });
}