//@ts-check

const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const Underwriter = require("./underwriters");

const GolfersRates = sequelizeConnection.define("GolfersRates", {
  annualPremium: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  levies: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  stampDuty: {
    type: Sequelize.DOUBLE,
    allowNull: false
  }
});

GolfersRates.belongsTo(Underwriter, {
    foreignKey: {
        allowNull: false,
    },
    onDelete: "cascade",
});
module.exports = GolfersRates;
