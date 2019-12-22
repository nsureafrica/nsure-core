const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const User = require("./User");

const SalamahPolicy = sequelizeConnection.define("TravelPolicy", {
  // SPOUSE INFORMATION
  nameOfSpouse: {
    type: Sequelize.STRING,
    allowNull: true
  },
  iDNumberOfSpouse: {
    type: Sequelize.STRING,
    allowNull: true
  },

  // Parents Details
  parentsDetails: {
    type: Sequelize.STRING,
    allowNull: true
  },

  // CHILD DETAILS
  childDetails: {
    type: Sequelize.STRING,
    allowNull: true
  },

  // ADDITIONAL MEMBERS
  additionalMembersDetails: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

SalamahPolicy.belongsTo(User);
