// @ts-check

const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const UnderwriterModel = require("./underwriters");

const DomesticPolicyContentPlansModel = sequelizeConnection.define(
  "DomesticPolicyContentPlans",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    total_value: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    annual_premium: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
  }
);

DomesticPolicyContentPlansModel.belongsTo(UnderwriterModel)

module.exports = DomesticPolicyContentPlansModel