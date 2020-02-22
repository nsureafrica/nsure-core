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
    type: Sequelize.STRING,
    allowNull: false
  },
  endDate: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nationalId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  passportNumber:{
    type: Sequelize.STRING,
    allowNull: false
  },
  kraPin: {
    type: Sequelize.STRING,
    allowNull: true
  },
  nationalIdBackPhotoPath: {
    type: Sequelize.STRING,
    allowNull: true
  },
  nationalIdFrontPhotoPath: {
    type: Sequelize.STRING,
    allowNull: true
  },
  passportBackPhotoPath: {
    type: Sequelize.STRING,
    allowNull: true
  },
  passportFrontPhotoPath: {
    type: Sequelize.STRING,
    allowNull: true
  },
  paid:{
    type: Sequelize.BOOLEAN,
    allowNull: true,
    defaultValue: false
  },
  active:{
    type: Sequelize.BOOLEAN,
    allowNull: true,
    defaultValue: false
  },
});

TravelPolicy.belongsTo(User);

module.exports = TravelPolicy;
