const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const User = require("./User");

const TravelPolicy = sequelizeConnection.define("TravelPolicy", {
  //MEDICAL EXPENSES
  medicalExpenses: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  followUpTreatmentInCountryOfResidence:{
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  medicalEvaluationExpenses:{
    type: Sequelize.FLOAT,
    allowNull: false
  },
  repartriationOfMortalRemains:{
    type: Sequelize.BOOLEAN
  },
  accompanyingFamilyMember:{
    type: Sequelize.STRING
  },

  //TRAVEL ASSISTANCE SERVICES

  prematureReturn:{
    type: Sequelize.BOOLEAN
  },
  legalAssisntace:{
    type: Sequelize.BOOLEAN
  },
  // LUGGAGE,TRADE SAMPLES OR PERSONAL EFFECTS

  lossOrTheft:{
    type: Sequelize.BOOLEAN
  },
  luggageDelay:{
    type: Sequelize.BOOLEAN
  },
  destination:{
      type: Sequelize.STRING
  },
  periodOfStay:{
      type: Sequelize.INTEGER
  },
  nationalId:{
      type:Sequelize.STRING
  },
  kraPin:{
      type:Sequelize.STRING
  }
});

TravelPolicy.belongsTo(User);


module.exports = TravelPolicy
