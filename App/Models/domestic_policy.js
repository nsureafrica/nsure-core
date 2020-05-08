// @ts-check

const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const User = require("./User");
const Bill = require("./Bill");

const DomesticPolicyModel = sequelizeConnection.define("DomesticPolicy", {
  physical_address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type_of_dwelling: {
    type: Sequelize.ENUM("private","selfContained"),
    allowNull: false,
  },
  rooms_not_self_contained: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  wall_construction_material: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  roof_construction_material: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  outbuildings: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  outbuildings_wall_construction_material: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  outbuildings_roof_construction_material: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  trade_activity_in_premise: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  number_of_other_tenants: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  days_without_inhabitants: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  consecutive_days_without_inhabitants: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  building_state: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  previous_insurer: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  previous_insurer_name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  previous_insurer_decline_to_insure: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
  previous_insurer_require_special_terms: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
  previous_insurer_canceled_insuarance: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
  loss_from_mentioned_perils: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  //cover details
  coverStart:{
    type: Sequelize.DATE,
    allowNull:true
  },
  coverEnd:{
    type:Sequelize.DATE,
    allowNull:true
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  activatedBy:{
    type: Sequelize.INTEGER,
    allowNull: true,
  }
});

DomesticPolicyModel.belongsTo(User);
DomesticPolicyModel.belongsTo(Bill);

module.exports = DomesticPolicyModel;
