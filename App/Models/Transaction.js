//@ts-check

const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const User = require("./User");
const Transaction = sequelizeConnection.define("Transaction", {
  transactionRef: {
    type: Sequelize.STRING,
    allowNull: false
  },
  amount: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  transactionType: {
    type: Sequelize.ENUM("MPESA", "BANK", "AIRTEL", "OTHER"),
    allowNull: false,
    defaultValue: "OTHER"
  },
  verified: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    defaultValue: false
  }
});


Transaction.belongsTo(User, { as: 'verifiedBy' });
module.exports = Transaction;
