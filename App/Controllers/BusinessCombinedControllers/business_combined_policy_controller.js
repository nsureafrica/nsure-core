//@ts-check

// bill and last expense model
// get all , get one , get for user and query for user
const BusinessCombinedPolicyModel = require("./../../Models/business_combined_policy");
const SharedControllers = require("./../SharedControllers/shared_controllers");
const invoiceEmail = require("./../../email_templates/invoicetemplate");

module.exports = {
  getAllPolicies: (req, res) => {
    SharedControllers.getAllPolicies(req, res, BusinessCombinedPolicyModel);
  },
  getOnePolicy: (req, res) => {
    SharedControllers.getOnePolicyById(req, res, BusinessCombinedPolicyModel);
  },
  getUsersPolicy: (req, res) => {
    SharedControllers.getAllPoliciesByUserId(req, res, BusinessCombinedPolicyModel);
  },
  createPolicy: (req, res) => {
    var mailOptions = {
      from: process.env.senderEmailAdress,
      to: `${req.user.email},${process.env.spireReceivingEmailAddress}`,
      subject: "Business Combined Policy Created",
      html: invoiceEmail.invoicePolicyEmail(req),
    };
    SharedControllers.createPolicy(req, res, BusinessCombinedPolicyModel, mailOptions);
  },
  //Activate Business Combined Policy
  activatePolicy: (req, res) => {
    SharedControllers.activatePolicy(req, res, BusinessCombinedPolicyModel);
  },

  exportDataAsCsv: (req, res) => {
    SharedControllers.exportDataAsCsv(req, res, BusinessCombinedPolicyModel);
  },
};
