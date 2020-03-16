//@ts-check

const Sequelize = require("sequelize");
const LastExpenseRates = require("./last_expense_rates")
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const Underwriter = require("./underwriters");
const LastExpensePlans = sequelizeConnection.define("LastExpensePlan", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  annualCover: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  typeOfClaim: {
    type: Sequelize.ENUM("single", "multiple"),
    allowNull: false
  },
});

LastExpensePlans.belongsTo(Underwriter);
LastExpensePlans.hasOne(LastExpenseRates)
module.exports = LastExpensePlans;
