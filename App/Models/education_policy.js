// @ts-check

const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const User = require("./User");
const uuidv1 = require("uuid/v1");


//TODO what am i supposed to save on all policies
const EducationPolicy = sequelizeConnection.define("EducationPolicy", {
  policyNickName:{
    type: Sequelize.STRING(50),
    allowNull:false
  },
  fullNameOfChild: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  ageOfChild: {
    // @ts-ignore
    type: Sequelize.INTEGER(3),
    allowNull: false
  },
  policyTerm: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  premiumAmount: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  
});

EducationPolicy.belongsTo(User);

module.exports = EducationPolicy;
