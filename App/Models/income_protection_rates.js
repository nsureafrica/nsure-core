//@ts-check

const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const Underwriter = require("./underwriters");

const IncomeProtectionRates = sequelizeConnection.define("IncomeProtectionRates", {
  annualPremium: {
    type: Sequelize.DOUBLE,
    allowNull: false
  }
});

IncomeProtectionRates.belongsTo(Underwriter, {
    foreignKey: {
        allowNull: false,
    },
    onDelete: "cascade",
});
module.exports = IncomeProtectionRates;
