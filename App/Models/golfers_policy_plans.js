//@ts-check

const Sequelize = require("sequelize");
const GolfersRates = require("./golfers_policy_rates")
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const Underwriter = require("./underwriters");
const GolfersPlans = sequelizeConnection.define("GolfersPlan", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  personalEffect:{
      type: Sequelize.DOUBLE,
      allowNull:false
  },
  golfersEquipmentCoverLimit: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  legalLiabilityCoverLimit: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  personalAccidentCoverLimit: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  holeInOneCoverLimit: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  medicalExpensesForCaddiesCoverLimit: {
    type: Sequelize.DOUBLE,
    allowNull: false
  }
});

GolfersPlans.belongsTo(Underwriter, {
    foreignKey: {
        allowNull: false,
    },
    onDelete: "cascade",
});
GolfersPlans.hasOne(GolfersRates, {
    foreignKey: {
        allowNull: false,
    },
    onDelete: "cascade",
})
module.exports = GolfersPlans;
