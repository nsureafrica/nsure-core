//@ts-check

const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const Underwriter = require("./underwriters");
const User = require("./User");
const Bill = require("./Bill")
const LastExpensePlan = require("./last_expense_plans")
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
})

LastExpensePolicy.belongsTo(User);
LastExpensePolicy.belongsTo(Bill);
LastExpensePolicy.hasOne(LastExpensePlan);
module.exports = LastExpensePolicy