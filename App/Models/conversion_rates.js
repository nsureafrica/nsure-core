//@ts-check
const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;


const ConversionRateModel = sequelizeConnection.define(
    "ConversionRates",
    {
      from: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      to: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rate: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
    }
  );

  module.exports = ConversionRateModel
