// @ts-check

const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;

//models for assosiations
const DomesticPolicyModel = require("./domestic_policy");
const DomesticPolicyScheduleOfPropertyModel = sequelizeConnection.define(
  "DomesticPolicyScheduleOfProperty",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    category: {
      type: Sequelize.ENUM("computers","mobilePhone","photographicEquipment","jewelry","others")
    },
    serial_number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    value: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
  }
);

DomesticPolicyScheduleOfPropertyModel.belongsTo(DomesticPolicyModel, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "cascade",
});

module.exports = DomesticPolicyScheduleOfPropertyModel;
