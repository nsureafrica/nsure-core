//@ts-check

const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;

const Transaction = sequelizeConnection.define("Transaction", {
  transactionRef: {
    type: Sequelize.STRING,
    allowNull: false
  },
  amount: {
    type: Sequelize.DOUBLE,
    allowNull: true
  },
  transactionType: {
    type: Sequelize.ENUM("MPESA", "BANK", "AIRTEL", "OTHER"),
    allowNull: false
  }
});

module.exports = Transaction;
