//@ts-check

const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;


const LastExpenseBeneficiaries = sequelizeConnection.define("LastExpenseBeneficiaries", {

    //names,relation,details
})

module.exports = LastExpenseBeneficiaries;
