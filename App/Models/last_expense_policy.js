//@ts-check

const Sequelize = require("sequelize");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const Underwriter = require("./underwriters");
const User = require("./User");
const Bill = require("./Bill")
const LastExpensePlan = require("./last_expense_plans")
const LastExpensePolicy = sequelizeConnection.define("LastExpensePolicy", {
    //what should i save here
})

LastExpensePolicy.belongsTo(User);
LastExpensePolicy.belongsTo(Bill);
LastExpensePolicy.hasOne(LastExpensePlan);