//@ts-check
const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const UnderwriterModel = require("./underwriters")
const BusinessCombinedClassesModel = sequelizeConnection.define(
  "BusinessCombinedClasses",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description2: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }
);

BusinessCombinedClassesModel.belongsTo(UnderwriterModel, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "cascade",
})
module.exports = BusinessCombinedClassesModel