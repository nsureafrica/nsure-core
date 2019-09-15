const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const User = require("./User");
const MotorCategory = require("./motor_category");
const uuidv1 = require("uuid/v1");

const MotorPolicy = sequelizeConnection.define("MotorPolicy", {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    allowNull: false,
    defaultValue: uuidv1()
  },
  vehicleType: {
    type: Sequelize.ENUM("Private", "Commercial"),
    allowNull: false
  },
  coverType: {
    type: Sequelize.ENUM("Comprehensive", "Third Party"),
    allowNull: false
  },
  vehicleEstimatedValue: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  courtesyCarOption: {
    type: Sequelize.ENUM(6, 10)
  },
  politicalViolence: {
    type: Sequelize.BOOLEAN
  },
  excessProtector: {
    type: Sequelize.BOOLEAN
  }
});

MotorPolicy.belongsTo(User);
User.hasMany(MotorPolicy);
MotorPolicy.hasOne(MotorCategory);

module.exports = MotorPolicy;
