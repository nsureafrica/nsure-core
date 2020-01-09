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
    type: Sequelize.STRING(10),
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
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    min: 7
  },
  tempPassword: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  }
});

User.belongsTo(UserCategory); 

module.exports = User;
