//@ts-check

const DomesticPolicyModel = require("../../Models/domestic_policy")
const SharedControllers = require("../SharedControllers/shared_controllers");
const invoiceEmail = require("../../email_templates/invoicetemplate");

module.exports = {
    getAllPolicies: (req, res) => {
      SharedControllers.getAllPolicies(req, res, DomesticPolicyModel);
    },
    getOnePolicy: (req, res) => {
      SharedControllers.getOnePolicyById(req, res, DomesticPolicyModel);
    },
    getUsersPolicy: (req, res) => {
      SharedControllers.getAllPoliciesByUserId(req, res, DomesticPolicyModel);
    },
    createPolicy: (req, res) => {
      var mailOptions = {
        from: process.env.senderEmailAdress,
        to: `${req.user.email},${process.env.spireReceivingEmailAddress}`,
        subject: "Domestic Policy Created",
        html: invoiceEmail.invoicePolicyEmail(req)
      };
      SharedControllers.createPolicy(
        req,
        res,
        DomesticPolicyModel,
        mailOptions
      );
    },
    //Activate Domestic Policy
    activatePolicy: (req, res) => {
      SharedControllers.activatePolicy(req, res, DomesticPolicyModel);
    },
  
    exportDataAsCsv: (req,res) => {
      SharedControllers.exportDataAsCsv(req,res,DomesticPolicyModel)
    }
  };