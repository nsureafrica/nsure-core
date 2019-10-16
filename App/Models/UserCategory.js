const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const uuidv1 = require("uuid/v1");

const UserCategory = sequelizeConnection.define("UserCategory", {
  name: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  description: {
    type: Sequelize.STRING
  }
});

module.exports = UserCategory;
