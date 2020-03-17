//@ts-check

const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const Underwriter = require("./underwriters");
const TravelPolicyPlan = sequelizeConnection.define("TravelPolicyPlan", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  typeOfCover: {
    type: Sequelize.ENUM("individual", "family","student"),
    allowNull: false
  },
});

TravelPolicyPlan.belongsTo(Underwriter);
module.exports = TravelPolicyPlan;
