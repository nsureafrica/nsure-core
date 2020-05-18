// @ts-check

const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;

//models for assosiations
const BusinessCombinedPolicyModel = require("./business_combined_policy");
const BusinessCombinedPolicySchedule = sequelizeConnection.define(
  "BusinessCombinedPolicySchedule",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    class: {
      type: Sequelize.ENUM("fireAndPerils","electronicEquipment","allRisksForComputers","fidelityGuarantee","money","politicalAndTerrorism","burglary","publicLiability")
    },
    serial_number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    value: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    proofOfPurchase: {
        type: Sequelize.STRING,
        allowNull:true
    },
    scheduleUUID:{
        type: Sequelize.STRING,
        allowNull:false
    }
  }
);

BusinessCombinedPolicySchedule.belongsTo(BusinessCombinedPolicyModel, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "cascade",
});

module.exports = BusinessCombinedPolicySchedule;
