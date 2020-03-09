//@ts-check

const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const Underwriter = require("./underwriters");
const LastExpensePolicy = sequelizeConnection.define("LastExpensePolicy", {
    
})