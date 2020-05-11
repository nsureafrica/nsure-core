// @ts-check

const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;

const UnderwriterModel = require("./underwriters");
const DomesticPolicyBuildingPlanModel = sequelizeConnection.define(
  "DomesticPolicyBuildingPlan",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lower_value: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    higher_value: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    annual_premium: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
  }
);

DomesticPolicyBuildingPlanModel.belongsTo(UnderwriterModel, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "cascade",
});

module.exports = DomesticPolicyBuildingPlanModel
