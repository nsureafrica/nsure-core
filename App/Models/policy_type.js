const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;

const PolicyType = sequelizeConnection.define("PolicyType", {
  policyTypeName: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  policyTypeDesc: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  policyTypeSummary:{
    type: Sequelize.TEXT,
    allowNull: true
  }
});

module.exports = PolicyType;
