// @ts-check

const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const User = require("./User");
const Bill = require("./Bill")

const TravelPolicy = sequelizeConnection.define("TravelPolicy", {
  //MEDICAL EXPENSES
  medicalExpenses: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  followUpTreatmentInCountryOfResidence: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  medicalEvaluationExpenses: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue:0
  },
  repartriationOfMortalRemains: {
    type: Sequelize.BOOLEAN
  },
  accompaniedByFamilyMember: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  },

  //TRAVEL ASSISTANCE SERVICES

  prematureReturn: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  legalAssistance: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  // LUGGAGE,TRADE SAMPLES OR PERSONAL EFFECTS

  lossOrTheft: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  luggageDelay: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  destination: {
    type: Sequelize.STRING,
    allowNull: false
  },
  startDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  endDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  kraPin: {
    type: Sequelize.STRING,
    allowNull: true
  },
  nationalId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  passport: {
    type: Sequelize.STRING,
    allowNull: false
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  activatedBy: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
});

TravelPolicy.belongsTo(User);
TravelPolicy.belongsTo(Bill);
module.exports = TravelPolicy;
