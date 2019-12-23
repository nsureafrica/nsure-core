// @ts-check

const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const User = require("./User");

const TravelPolicy = sequelizeConnection.define("TravelPolicy", {
  //MEDICAL EXPENSES
  medicalExpenses: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  followUpTreatmentInCountryOfResidence: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  medicalEvaluationExpenses: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  repartriationOfMortalRemains: {
    type: Sequelize.BOOLEAN
  },
  accompanyingFamilyMember: {
    type: Sequelize.STRING
  },

  //TRAVEL ASSISTANCE SERVICES

  prematureReturn: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  legalAssisntace: {
    type: Sequelize.BOOLEAN
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
  periodOfStay: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nationalId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  kraPin: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

TravelPolicy.belongsTo(User);

module.exports = TravelPolicy;
