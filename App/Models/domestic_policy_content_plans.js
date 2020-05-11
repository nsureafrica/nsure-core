// @ts-check

const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const UnderwriterModel = require("./underwriters");

const DomesticPolicyContentPlansModel = sequelizeConnection.define(
  "DomesticPolicyContentPlans",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    total_value: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    annual_premium: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    sofaSet: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    beds: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    otherFurniture: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    kitchenUtensils: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    clothes: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    carpets: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    gasCylinders: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    tv: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    dvd: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    radio: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    microwave: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    fridge: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    deepFreezer: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    washingMachine: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    gasCooker: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    ironBox: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    otherKitchenAppliance: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    toysAndBooks: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    ePlus: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
  }
);

DomesticPolicyContentPlansModel.belongsTo(UnderwriterModel, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "cascade",
});

module.exports = DomesticPolicyContentPlansModel;