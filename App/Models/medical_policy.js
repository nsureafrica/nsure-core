const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const User = require("./User");
const uuidv1 = require("uuid/v1");

const MedicalPolicy = sequelizeConnection.define("MedicalPolicy", {
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
  outPatientPerPerson: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  maternityCover: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
});

MedicalPolicy.belongsTo(User);
User.hasMany(MedicalPolicy);

module.exports = MedicalPolicy;
