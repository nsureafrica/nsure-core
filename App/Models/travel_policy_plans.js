// @ts-check

const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const underwritterModel = require("./underwriters")
const travelPolicyRateModel = require("./travel_policy_rates")

const TravelPolicyPlansModel = sequelizeConnection.define("TravelPolicyPlans", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  //enum
  type: {
    type: Sequelize.ENUM("family", "student", "individual"),
    allowNull: false,
  },
  currency: {
    type: Sequelize.ENUM("USD", "KES"),
    allowNull: false,
    defaultValue: "KES"
  },
  medicalExpenses: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  medicalRepatriation: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  childRepatriation: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  relativesRepatriation: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  bodyRepatriation: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  opticalEmergencyCare: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  dentalEmergencyCare: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  followUpTreatment: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  prematureReturnInCaseOfDeath: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  advanceOfBail: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  legalAssistance: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  lossOrTheftUnregisteredLuggage: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  lossOrTheftRegisteredLuggage: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  luggageDelay: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  travelDelay: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  //Madison Specific
  personalCivilLiability: {
    type: Sequelize.DOUBLE,
    allowNull: true,
  },
  hijackInMeansOfPublicTransport:{
    type: Sequelize.DOUBLE,
    allowNull: true,
  },
  journeyCancelation: {
    type: Sequelize.DOUBLE,
    allowNull: true
  },
  journeyCurtailment: {
    type: Sequelize.DOUBLE,
    allowNull: true
  },
  missedTravelConnection: {
    type: Sequelize.DOUBLE,
    allowNull: true
  },
  winterSports: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

TravelPolicyPlansModel.belongsTo(underwritterModel, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "cascade",
})
module.exports = TravelPolicyPlansModel;

