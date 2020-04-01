const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const User = require("./User");
const Bill = require("./Bill");

const MedicalPolicy = sequelizeConnection.define("MedicalPolicy", {
  // CLIENT INFORMATION

  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dateOfBirth: {
    type: Sequelize.STRING,
    allowNull: false
  },
  idNumber: {
    type: Sequelize.STRING,
    allowNull: false
  },
  kraPin: {
    type: Sequelize.STRING,
    allowNull: false
  },
  beneficiaries: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  // CORE COVER

  principalAgeDateOfBirth: {
    type: Sequelize.STRING,
    allowNull: false
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
    allowNull: false,
    defaultValue: false
  },
  dentalCover: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  opticalCover: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  activatedBy: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
});

MedicalPolicy.belongsTo(User);
MedicalPolicy.belongsTo(Bill);
module.exports = MedicalPolicy;
