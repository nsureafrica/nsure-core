//@ts-check
const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;

const TransactionModel = require("./Transaction");

const Bill = sequelizeConnection.define("Bill", {
  amount: { type: Sequelize.DOUBLE, allowNull: false, defaultValue: 0 }
});

Bill.hasMany(TransactionModel);
module.exports = Bill;
