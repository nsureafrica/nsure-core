//@ts-check

// bill and last expense model
// get all , get one , get for user and query for user
const LastExpensePolicyModel = require("./../../Models/last_expense_policy");
const SharedControllers = require("./../SharedControllers/shared_controllers");
const invoiceEmail = require("./../../email_templates/invoicetemplate");

module.exports = {
  getAllLastExpensePolicies: (req, res) => {
    SharedControllers.getAllPolicies(req, res, LastExpensePolicyModel);
  },
  getOneLastExpensePolicy: (req, res) => {
    SharedControllers.getOnePolicyById(req, res, LastExpensePolicyModel);
  },
  getUsersLastExpensePolicy: (req, res) => {
    SharedControllers.getAllPoliciesByUserId(req, res, LastExpensePolicyModel);
  },
  createLastExpensePolicy: (req, res) => {
    var mailOptions = {
      from: process.env.senderEmailAdress,
      to: `${req.user.email},${process.env.spireReceivingEmailAddress}`,
      subject: "Last Expense Policy Created",
      html: invoiceEmail.invoicePolicyEmail(req)
    };
    SharedControllers.createPolicy(
      req,
      res,
      LastExpensePolicyModel,
      mailOptions
    );
  },
  //Activate Last Expense Policy
  activateLastExpensePolicy: (req, res) => {
    SharedControllers.activatePolicy(req, res, LastExpensePolicyModel);
  }
};
