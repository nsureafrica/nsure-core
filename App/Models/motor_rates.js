//@ts-check

const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const underWriters = require("./underwriters");
const vehicleClass = require("./motor_vehicle_class");
const MotorRates = sequelizeConnection.define("MotorRates", {
  basic: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    defaultValue: 0
  },
  excessProtector: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    defaultValue: 0
  },
  politicalViolenceTerrorism: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    defaultValue: 0
  },
  minimumPremium: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    defaultValue: 0
  },
  minimumExcess: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    defaultValue: 0
  },
  minimumPoliticalViolenceTerrorism: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    defaultValue: 0
  },
  passengerLegalLiability: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    defaultValue: 0
  },
  roadsideAssistance: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    defaultValue: 0
  },
  courtesyCar: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    defaultValue: 0
  },
  vehicleType: {
    type: Sequelize.ENUM("private", "commercial"),
    allowNull: false
  },
  coverType: {
    type: Sequelize.ENUM("comprehensive", "thirdParty"),
    allowNull: false
  },
  natureOfGoods:{
    type: Sequelize.ENUM("generalCartage", "ownGoods"),
    allowNull: true
  }
});
MotorRates.belongsTo(underWriters);
MotorRates.belongsTo(vehicleClass);
module.exports = MotorRates;
