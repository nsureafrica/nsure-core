const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const User = require("./User");
const MotorCategory = require("./motor_category");

const MotorPolicy = sequelizeConnection.define("MotorPolicy", {
  // AUTOMOBILE INFORMATION
  vehicleEstimatedValue: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  vehicleModel: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.ENUM(
      "motorPrivate",
      "motorCommercial",
      "heavyMachinery",
      "tankers",
      "pmo",
      "specialTypes",
      "psv",
      "drivingSchools"
    ),
    allowNull: false
  },
  vehicleType: {
    type: Sequelize.ENUM("private", "commercial"),
    allowNull: false
  },
  coverType: {
    type: Sequelize.ENUM("comprehensive", "thirdParty"),
    allowNull: false
  },
  courtesyCarOption: {
    type: Sequelize.ENUM("6", "10"),
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
  logbookPath: {
    type: Sequelize.STRING,
    allowNull: false
  },

  politicalViolence: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    defaultValue: false
  },
  excessProtector: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
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

  //quote or paid policy
  paid: {
    type: Sequelize.BOOLEAN, allowNull: false,defaultValue:false
  },
  paidAmount: {
    type: Sequelize.FLOAT,
    allowNull: true
  },
  quoteAmount: {
    type: Sequelize.FLOAT,
    allowNull: true
  }
});

MotorPolicy.belongsTo(User,{foreignKey:"emailAddress",targetKey:"email"});
MotorPolicy.hasOne(MotorCategory);

module.exports = MotorPolicy;
