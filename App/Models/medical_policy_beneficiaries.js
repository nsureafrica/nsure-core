const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const User = require("./User");
const MedicalPolicy = require("./medical_policy");
const uuidv1 = require("uuid/v1");

const MedicalBeneficiaries = sequelizeConnection.define(
  "MedicalBeneficiaries",
  {
    fullNameOfBeneficiary: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    ageOfBeneficiary: {
      type: Sequelize.INTEGER(3),
      allowNull: false
    },
    Gender: {
      type: Sequelize.ENUM("Male", "Female"),
      allowNull: false
    },
    relationshipToPrincipal: {
      type: Sequelize.ENUM("Spouse", "Parent", "Child"),
      allowNull: false
    },
    dental: {
      type: Sequelize.BOOLEAN
    },
    optical: {
      type: Sequelize.BOOLEAN
    },
    lastExpense: {
      type: Sequelize.BOOLEAN
    },
    personalAccident: {
      type: Sequelize.BOOLEAN
    }
  }
);

MedicalBeneficiaries.belongsTo(MedicalPolicy);
MedicalPolicy.hasMany(MedicalBeneficiaries);

module.exports = MedicalBeneficiaries;
