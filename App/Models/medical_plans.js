//@ts-check

const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const Underwriter = require("./underwriters");
const MedicalPlans = sequelizeConnection.define("MedicalPlan", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
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
  },
  generalConditions: {
    type:Sequelize.TEXT,
    allowNull:true
  }
});

MedicalPlans.belongsTo(Underwriter);
module.exports = MedicalPlans;
