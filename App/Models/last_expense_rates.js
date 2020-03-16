//@ts-check

const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const Underwriter = require("./underwriters");
const LastExpensePlanModel = require("./last_expense_plans")
const LastExpenseRates = sequelizeConnection.define("LastExpenseRate", {
  annualPremiumNuclearFamily: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  annualPremiumPerExtraChild: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  annualPremiumPerParent: {
    type: Sequelize.DOUBLE,
    allowNull: false
  }
});

LastExpenseRates.belongsTo(Underwriter)
module.exports = LastExpenseRates