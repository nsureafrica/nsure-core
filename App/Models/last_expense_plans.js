//@ts-check

const Sequelize = require("sequelize");
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
  }
});

LastExpensePlans.belongsTo(Underwriter);
module.exports = LastExpensePlans;
