//@ts-check

const Sequelize = require("sequelize");
const IncomeProtectionRates = require("./income_protection_rates")
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const Underwriter = require("./underwriters");
const IncomeProtectionPlans = sequelizeConnection.define("IncomeProtectionPlans", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  funeralCoverLimit: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  retrenchmentCoverLimit: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  rentPaymentCoverLimit: {
    type: Sequelize.DOUBLE,
    allowNull: false
  }
});

IncomeProtectionPlans.belongsTo(Underwriter, {
  foreignKey: {
      allowNull: false,
  },
  onDelete: "cascade",
});
IncomeProtectionPlans.hasOne(IncomeProtectionRates, {
    foreignKey: {
        allowNull: false,
    },
    onDelete: "cascade",
  })
module.exports = IncomeProtectionPlans;
