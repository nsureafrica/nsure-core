//@ts-check

const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;

const MotorRates = sequelizeConnection.define("MotorRates", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  logo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  website: {
    type: Sequelize.STRING,
    allowNull: false
  },
  contact: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
module.exports = MotorRates;
