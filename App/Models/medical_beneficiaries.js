const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;


const MedicalBeneficiariesModel = sequelizeConnection.define("MedicalBeneficiaries", {})

module.exports = MedicalBeneficiariesModel