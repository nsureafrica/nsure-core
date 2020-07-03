//@ts-check
const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;

const TransactionModel = require("./Transaction");

const Bill = sequelizeConnection.define("Bill", {
  amount: { type: Sequelize.DOUBLE, allowNull: false, defaultValue: 0 },
  paid: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  amountPaid: {type: Sequelize.DOUBLE, allowNull: false, defaultValue: 0}
});

Bill.hasMany(TransactionModel,{
  foreignKey: {
    allowNull: false,
  },
  onDelete: "cascade",
});
module.exports = Bill;
