//@ts-check

const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const UserCategory = require("./UserCategory");

const User = sequelizeConnection.define("User", {
  firstName: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  phoneNumber: {
    type: Sequelize.STRING(15),
    allowNull: false,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "KE"
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "Nairobi"
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    min: 7
  },
  tempPassword: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  },
  isVerified: {
    type:Sequelize.BOOLEAN,
    allowNull: false
  }
});

User.belongsTo(UserCategory, {
  foreignKey: {
    defaultValue: 1,
    allowNull: false
  }
}); 

module.exports = User;
