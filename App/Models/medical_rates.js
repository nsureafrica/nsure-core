//@ts-check

const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const MedicalPlan = require("./medical_plans")
const Underwriter = require("./underwriters")
const MedicalRates = sequelizeConnection.define("MedicalRate", {

  principalInpatientAnnualYouth: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  spouseInpatientAnnualYouth: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  childrenInpatientAnnual: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  principalInpatientAnnualMiddleAge: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  spouseInpatientAnnualMiddleAge: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  principalInpatientAnnualSenior: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  spouseInpatientAnnualSenior: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  principalOutpatientAnnualYouth:{
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  spouseOutpatientAnnualYouth:{
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  principalOutpatientAnnualMiddleAge:{
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  spouseOutpatientAnnualMiddleAge:{
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  principalOutpatientAnnualSenior:{
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  spouseOutpatientAnnualSenior:{
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  childrenOutpatientAnnual:{
    type: Sequelize.DOUBLE,
    allowNull: false
  }
});

MedicalRates.belongsTo(MedicalPlan)
MedicalRates.belongsTo(Underwriter)
module.exports = MedicalRates