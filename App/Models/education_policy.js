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
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dob: {
    type: Sequelize.DATE,
    allowNull: false
  },
  expectedCommencementDate: {
    type: Sequelize.DATE,
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
    type: Sequelize.ENUM("quarterly","monthly","halfAnnually","annually"),
    allowNull: false
  },
  targetAmount:{
    type: Sequelize.DOUBLE,
    allowNull: false
  },
   //cover details
   coverStart:{
    type: Sequelize.DATE,
    allowNull:true
  },
  coverEnd:{
    type:Sequelize.DATE,
    allowNull:true
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  activatedBy:{
    type: Sequelize.INTEGER,
    allowNull: true,
  }
  
});

EducationPolicy.belongsTo(User);
EducationPolicy.belongsTo(Bill);
module.exports = EducationPolicy;
