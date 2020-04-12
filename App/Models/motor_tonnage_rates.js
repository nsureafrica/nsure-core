const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const MotorRates = require("./motor_rates");

const MotorTonnageRates = sequelizeConnection.define("MotorTonnageRates", {
  tier1: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  tier2: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  tier3: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  tier4: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
});

MotorTonnageRates.belongsTo(MotorRates);

module.exports = MotorTonnageRates;
