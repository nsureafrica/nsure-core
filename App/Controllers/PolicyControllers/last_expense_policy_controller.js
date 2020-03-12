//@ts-check

// bill and last expense model
// get all , get one , get for user and query for user
const LastExpensePolicyModel = require("./../../Models/last_expense_policy");
const SharedControllers = require("./../SharedControllers/shared_controllers");

module.exports = {
  getAllLastExpensePolicies: (req, res) => {
    SharedControllers.getAllPolicies(req, res, LastExpensePolicyModel);
  },
  getOneLastExpensePolicy: (req, res) => {
    SharedControllers.getOnePolicyById(req, res, LastExpensePolicyModel);
  },
  getUsersLastExpensePolicy: (req,res) => {
    SharedControllers.getAllPoliciesByUserId(req,res,LastExpensePolicyModel);
  },
  createLastExpensePolicy: (req,res) => {
      SharedControllers.createPolicy(req,res,LastExpensePolicyModel);
  }
};
