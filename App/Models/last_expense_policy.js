//@ts-check

const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const Underwriter = require("./underwriters");
const User = require("./User");
const Bill = require("./Bill");
const LastExpensePlan = require("./last_expense_plans");
const LastExpensePolicy = sequelizeConnection.define("LastExpensePolicy", {
  //what should i save here
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dateOfBirth: {
    type: Sequelize.STRING,
    allowNull: false
  },
  idNumber: {
    type: Sequelize.STRING,
    allowNull: false
  },
  kraPin: {
    type: Sequelize.STRING,
    allowNull: false
  },

  medicalHealthDeclaration: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  notHealthyBeneficiaries: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  beneficiaries: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  // CORE COVER

  principalAgeDateOfBirth: {
    type: Sequelize.STRING,
    allowNull: false
  },
  numberOfChildren: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  activatedBy:{
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  paid:{
    type:Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  paidVerifiedBy:{
    type:Sequelize.INTEGER,
    allowNull: true
  }
});

LastExpensePolicy.belongsTo(User);
LastExpensePolicy.belongsTo(Bill);
module.exports = LastExpensePolicy;
