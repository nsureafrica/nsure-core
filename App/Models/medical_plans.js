//@ts-check

const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;

const MedicalPlans = sequelizeConnection.define("MedicalPlan", {    
    inpatientCoverLimit: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    chronicCases: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    maternityCoverLimit: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    limitPerFamilyPerAnnum: {
      type: Sequelize.DOUBLE,
      allowNull: false
    }
  });
  
  module.exports = MedicalPlans