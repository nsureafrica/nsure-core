//@ts-check
const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;

const TransactionModel = require("./Transaction");

const Bill = sequelizeConnection.define("Bill", {
  amount: { type: Sequelize.DOUBLE }
});

Bill.hasMany(TransactionModel);
module.exports = Bill;
