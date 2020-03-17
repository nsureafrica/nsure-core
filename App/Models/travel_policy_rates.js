//@ts-check

const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const Underwriter = require("./underwriters");

const TravelPolicyRates = sequelizeConnection.define("TravelPolicyRate", {
  medicalExpenses: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  medicalRepatriation: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  childRepatriation: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  relativeRepatriation: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  bodyRepatriation: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  opticalEmergencyCare: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  dentalEmergencyCare: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  followUpTreatment: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  prematureReturn: {
    type: Sequelize.DOUBLE,
    allowNull: false
  }
});

TravelPolicyRates.belongsTo(Underwriter);
module.exports = TravelPolicyRates;
