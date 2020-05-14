//@ts-check
const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const UserModel = require("./User")
const BillModel = require("./Bill")
const BusinessComibinedPolicyModel = sequelizeConnection.define(
  "BusinessComibinedPolicy",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    buildingsValue: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    contentsValue: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    computersAsSpecified: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    variousComputersPrintersAndPhones: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    cashiers: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    salesPerson: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    perCapita: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    moneyInTransitUntilPaidOut: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    moneyInPremisesDuringBusinessHours: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    moneyInLockedSafe: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    cashWithAuthorisedEmployees: { type: Sequelize.DOUBLE, allowNull: false },
    damageToSafe: { type: Sequelize.DOUBLE, allowNull: false },
    estimatedAnnualCarry: { type: Sequelize.DOUBLE, allowNull: false },
    maximumLimitOnMaterialDamage: { type: Sequelize.DOUBLE, allowNull: false },
    maximumLimitOnMoney: { type: Sequelize.DOUBLE, allowNull: false },
    valueOfContentItemsAsPerTheSchoolSchedule: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    anyOneOccurrence: { type: Sequelize.DOUBLE, allowNull: false },
    anyOnePeriodOfInsurance: { type: Sequelize.DOUBLE, allowNull: false },
  }
);

BusinessComibinedPolicyModel.belongsTo(UserModel,)
BusinessComibinedPolicyModel.belongsTo(BillModel,)

module.exports = BusinessComibinedPolicyModel;
