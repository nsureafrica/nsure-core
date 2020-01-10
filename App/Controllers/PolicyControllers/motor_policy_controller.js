// @ts-check
const MotorPolicy = require("../../Models/motor_policy");
const endpointAuthenticator = require("../../Utils/endpointAuthenticator");
const CustomFilter = require("./custom_filter_policy_controller")
const quoteController = require("../quote_controller")
module.exports = {
  getUserMotorPolicies: (req, res) => {
    // endpointAuthenticator.authenticateUser(req, res);
    MotorPolicy.findAll({
      where: {
        emailAddress: req.params.email
      }
    })
      .then(policies => {
        res.send(policies);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  getMotorPolicy: (req, res) => {
    // endpointAuthenticator.authenticateUser(req, res);
    MotorPolicy.findOne({
      where: {
        id: req.params.policyId
      }
    })
      .then(policy => {
        res.send(policy);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  createMotorPolicy: (req, res) => {
    // endpointAuthenticator.authenticateUser(req, res);
    var logbookPathArray = [];
    req.files.logbook.forEach(fileName => {
        logbookPathArray.push(fileName.filename);
    });
    MotorPolicy.create({
      vehicleEstimatedValue: req.body.vehicleEstimatedValue,
      vehicleModel: req.body.vehicleModel,
      vehicleType: req.body.vehicleType,
      category: req.body.category,
      coverType: req.body.coverType,
      courtesyCarOption: req.body.courtesyCarOption,
      registrationNumber: req.body.registrationNumber,
      chasisNumber: req.body.chasisNumber,
      engineNumber: req.body.engineNumber,
      logbookPath: logbookPathArray.toString(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      emailAddress: req.body.emailAddress,
      city: req.body.city,
      country: req.body.country,
      postalCode: req.body.postalCode,
      paid: req.body.paid,
      paidAmount: req.body.paidAmount,
      yearOfManufacture: req.body.yearOfManufacture,
      quoteAmount: 0
    })
      .then(response => {
        //Generate quote here
        quoteController.getMotorQuote(req,res,response)
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  //custom filter
  customFilterMotorPolicy:(req,res)=>CustomFilter.customPolicyFilter(MotorPolicy,req,res)
};
