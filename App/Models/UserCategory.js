const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const uuidv1 = require("uuid/v1");

const UserCategory = sequelizeConnection.define("UserCategory", {
  id: {
    type: Sequelize.UUID,
    defaultValue: uuidv1(),
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING(30),
    allowNull: false
  }
});

module.exports = UserCategory;
