const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const uuidv1 = require("uuid/v1");

const MotorCategory = sequelizeConnection.define("MotorCategory", {
  categoryName: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  categoryDesc: {
    type: Sequelize.STRING(30),
    allowNull: false
  }
});

module.exports = MotorCategory;
