//@ts-check
const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;

const UserPermission = sequelizeConnection.define("UserPermission", {
  name: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  description: {
    type: Sequelize.STRING
  }
});

module.exports = UserPermission;
