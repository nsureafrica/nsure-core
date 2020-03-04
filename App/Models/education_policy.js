// @ts-check

const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const User = require("./User");
const uuidv1 = require("uuid/v1");
const Bill = require("./Bill")


//TODO what am i supposed to save on all policies
const EducationPolicy = sequelizeConnection.define("EducationPolicy", {

  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  secondName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dateOfBirth: {
    type: Sequelize.STRING,
    allowNull: false
  },
  expectedCommencementDate: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ageNextBirthday:{
    type: Sequelize.INTEGER,
    allowNull: false
  },
  policyTerm:{
    type: Sequelize.INTEGER,
    allowNull: false},
  sumAssured:{
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  premium:{
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  frequency:{
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  targetAmount:{
    type: Sequelize.DOUBLE,
    allowNull: false
  }
  
});

EducationPolicy.belongsTo(User);
EducationPolicy.belongsTo(Bill);
module.exports = EducationPolicy;
