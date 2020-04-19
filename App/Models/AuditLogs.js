const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const UserModel = require("./User");

const AuditLog = sequelizeConnection.define("AuditLog", {
  action: { type: Sequelize.STRING, allowNull: false },
  country: { type: Sequelize.STRING, allowNull: true },
  county: { type: Sequelize.STRING, allowNull: true },
  clientInformation: { type: Sequelize.STRING, allowNull: true },
  continent: {type: Sequelize.STRING, allowNull: true}
});

AuditLog.belongsTo(UserModel);
module.exports = AuditLog;
