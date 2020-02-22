//@ts-check

const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;

const Underwriters = sequelizeConnection.define("Underwriters", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  logo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  website: {
    type: Sequelize.STRING,
    allowNull: false
  },
  contact: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
module.exports = Underwriters;
