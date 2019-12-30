// @ts-check
const MotorPolicy = require("../../Models/motor_policy");
const endpointAuthenticator = require("../../Utils/endpointAuthenticator");
const CustomFilter = require("./custom_filter_policy_controller")

module.exports = {
  getUserMotorPolicies: (req, res) => {
    // endpointAuthenticator.authenticateUser(req, res);
    MotorPolicy.findAll({
      where: {
        userId: req.params.userId
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
      carModel: req.body.carModel,
      motorcycle: req.body.motorcycle,
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
      UserId:req.body.UserId
    })
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  //custom filter
  customFilterMotorPolicy:(req,res)=>CustomFilter.customPolicyFilter(MotorPolicy,req,res)
};
