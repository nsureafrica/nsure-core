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
    type: Sequelize.STRING(),
    allowNull: false,
    defaultValue: "OTHER"
  },
  msisdn_idnum: {
    type: Sequelize.STRING,
    allowNull: true
  },
  status: {
    type: Sequelize.STRING,
    allowNull: true
  },
  verified: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    defaultValue: false
  }
});

Transaction.belongsTo(User, { as: "verifiedBy" });
Transaction.belongsTo(User);

module.exports = Transaction;
