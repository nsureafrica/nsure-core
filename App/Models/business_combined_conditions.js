//@ts-check
const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const BusinessCombinedClassesModel = require("./business_combined_classes")
const BusinessComibinedCondtionsModel = sequelizeConnection.define(
  "BusinessComibinedCondtions",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  }
);

BusinessComibinedCondtionsModel.belongsTo(BusinessCombinedClassesModel, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "cascade",
})

module.exports = BusinessComibinedCondtionsModel;
