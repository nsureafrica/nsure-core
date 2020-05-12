// @ts-check

const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const TravelPolicyPlansModel = require("./travel_policy_plans")

const TravelPolicyRatesModel = sequelizeConnection.define("TravelPolicyRates", {
  numberOfDays: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  amount: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  currency: {
    type: Sequelize.ENUM("USD", "KES"),
    allowNull: false,
    defaultValue: "KES",
  },
});

TravelPolicyRatesModel.belongsTo(TravelPolicyPlansModel, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "cascade",
})
module.exports = TravelPolicyRatesModel;
