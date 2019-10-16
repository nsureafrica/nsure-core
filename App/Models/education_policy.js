const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const User = require("./User");
const uuidv1 = require("uuid/v1");

const EducationPolicy = sequelizeConnection.define("EducationPolicy", {
  fullNameOfChild: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  ageOfChild: {
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
  }
});

EducationPolicy.belongsTo(User);
User.hasMany(EducationPolicy);

module.exports = EducationPolicy;
