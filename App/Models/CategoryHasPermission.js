//@ts-check

const Sequelize = require("sequelize");
const UserCategory = require("./UserCategory")
const UserPermission = require("./UserPermission")
const sequelizeConnection = require("../DB/database").sequelizeConnection;

const CategoryHasPermission = sequelizeConnection.define("CategoryHasPermission", {})


CategoryHasPermission.belongsTo(UserCategory)
CategoryHasPermission.belongsTo(UserPermission)

module.exports = CategoryHasPermission
