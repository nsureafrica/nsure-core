//@ts-check

const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;

const VehicleClass = sequelizeConnection.define("VehicleClass", {
  name: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  courtesyCar: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  excessProtector: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  politicalViolenceTerrorism: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  roadsideAssistance: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  passengerLegalLiability: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  maxAge: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});
module.exports = VehicleClass;
