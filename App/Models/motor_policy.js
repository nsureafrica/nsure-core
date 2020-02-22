const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const User = require("./User");
const VehicleClass = require("./motor_vehicle_class");
const UnderWriter = require("./underwriters")
const MotorPolicy = sequelizeConnection.define("MotorPolicy", {
  // AUTOMOBILE INFORMATION
  vehicleEstimatedValue: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  vehicleModelAndMake: {
    type: Sequelize.STRING,
    allowNull: false
  },
  //
  coverType: {
    type: Sequelize.ENUM("comprehensive", "thirdParty"),
    allowNull: false
  },

  registrationNumber: {
    type: Sequelize.STRING,
    allowNull: false
  },
  chasisNumber: {
    type: Sequelize.STRING,
    allowNull: false
  },
  engineNumber: {
    type: Sequelize.STRING,
    allowNull: false
  },
  yearOfManufacture: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  numberOfSeats: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  engineCapacity: {
    type: Sequelize.STRING,
    allowNull: false
  },
  natureOfGoods: {
    type: Sequelize.ENUM("generalCartage", "ownGoods"),
    allowNull: true
  },
  vehicleType: {
    type: Sequelize.ENUM("private", "commercial"),
    allowNull: false
  },
  logbookPath: {
    type: Sequelize.STRING,
    allowNull: false
  },

  politicalViolenceTerrorism: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    defaultValue: false
  },
  excessProtector: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  courtesyCarOption: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  roadsideAssistance: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },

  //CONTACT INFORMATION
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  emailAddress: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false
  },
  postalCode: { type: Sequelize.STRING, allowNull: false },
  kraPin: { type: Sequelize.STRING, allowNull: false },
  idNumber:{type: Sequelize.STRING, allowNull:false},
  //quote or paid policy
  paid: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  paidAmount: {
    type: Sequelize.FLOAT,
    allowNull: true
  },
  quoteAmount: {
    type: Sequelize.FLOAT,
    allowNull: true
  },
  active: {
    type: Sequelize.BOOLEAN, 
    allowNull: false,
    defaultValue: false
  }
});


MotorPolicy.belongsTo(User, { foreignKey: "emailAddress", targetKey: "email" });
MotorPolicy.belongsTo(VehicleClass);
MotorPolicy.belongsTo(UnderWriter)
module.exports = MotorPolicy;
