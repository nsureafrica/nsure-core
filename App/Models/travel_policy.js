// @ts-check

const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const User = require("./User");
const Bill = require("./Bill");
const TravelPolicyPlan = require("./travel_policy_plans")

const TravelPolicy = sequelizeConnection.define("TravelPolicy", {
  destination: {
    type: Sequelize.STRING,
    allowNull: false
  },
  startDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  endDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  kraPin: {
    type: Sequelize.STRING,
    allowNull: true
  },
  nationalId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  passport: {
    type: Sequelize.STRING,
    allowNull: false
  },
  //cover details
  coverStart: {
    type: Sequelize.DATE,
    allowNull: true
  },
  coverEnd: {
    type: Sequelize.DATE,
    allowNull: true
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  activatedBy: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
});

TravelPolicy.belongsTo(User);
TravelPolicy.belongsTo(Bill);
TravelPolicy.belongsTo(TravelPolicyPlan, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "cascade",
});
module.exports = TravelPolicy;
