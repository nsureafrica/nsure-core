const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const User = require("./User");
const uuidv1 = require("uuid/v1");

const MedicalPolicy = sequelizeConnection.define("MedicalPolicy", {
  // CLIENT INFORMATION

  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  secondName: {
    type: Sequelize.STRING,
    allowNull: false
  },

  // CORE COVER

  principalAgeDateOfBirth: {
    type: Sequelize.DATE,
    allowNull: false
  },
  spouseDateOfBirth: {
    type: Sequelize.DATE,
    allowNull: true
  },
  numberOfChildren: {
    type: Sequelize.INTEGER,
    allowNull: true
  },

  // OPTIONAL BENEFITS
  outPatientPerPerson: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  maternityCover: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  typeOfCover: {
    type: Sequelize.ENUM(
      "Royal",
      "Premier",
      "Executive",
      "Advanced",
      "Classic"
    ),
    allowNull: false
  },
  numberOfPeopleToReceiveDentalCover: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  numberOfPeopleToReceiveOpticalCover: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  numberOfMembersToBeCoveredUnderLastExpense: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  numberOfMembersToBeCoveredUnderPersonalAccident: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
});

MedicalPolicy.belongsTo(User);
module.exports = MedicalPolicy;
