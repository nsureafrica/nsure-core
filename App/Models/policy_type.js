const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const uuidv1 = require("uuid/v1");

const PolicyType = sequelizeConnection.define("PolicyType", {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    allowNull: false,
    defaultValue: uuidv1()
  },
  policyTypeName: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  policyTypeDesc: {
    type: Sequelize.STRING(30),
    allowNull: false
  }
});


module.exports = PolicyType;
