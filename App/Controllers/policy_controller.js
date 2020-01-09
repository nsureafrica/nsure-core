// @ts-check

const PolicyType = require("../Models/policy_type");
const endpointAuthenticator = require("../Utils/endpointAuthenticator");

module.exports = {
  getAllUserPolicies: (req, res) => {},
  //this is for internal use to create policies and their description and store them in the db
  createPolicy: (req, res) => {
    // endpointAuthenticator.authenticateUser(req, res);
    PolicyType.create({
      policyTypeName: req.body.policyTypeName,
      policyTypeDesc: req.body.policyTypeDesc,
      policyTypeAvailability: req.body.policyTypeAvailability
    })
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },
  getPolicies: (req, res) => {
    PolicyType.findAll()
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
};
