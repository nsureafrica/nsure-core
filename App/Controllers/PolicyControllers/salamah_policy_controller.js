// @ts-check

const SalamahTransitionPolicy = require("../../Models/salamah_policy");
const endpointAuthenticator = require("../../Utils/endpointAuthenticator");
const CustomFilter = require("./custom_filter_policy_controller")

module.exports = {

  getUserSalamahTransitionPolicies: (req, res) => {
    // endpointAuthenticator.authenticateUser(req, res);
    SalamahTransitionPolicy.findAll({
      where: {
        userId: req.params.userId
      }
    })
      .then(policies => {
        res.send(policies);
      })
      .catch(err => {
        res.status(500).send(err)
      });
  },
  getSalamahTransitionPolicy: (req, res) => {
    // endpointAuthenticator.authenticateUser(req, res);
    SalamahTransitionPolicy.findOne({
      where: {
        id: req.params.policyId
      }
    })
      .then(policy => {
        res.send(policy);
      })
      .catch(err => {
        res.status(500).send(err)
      });
  },
  createSalamahTransitionPolicy: (req, res) => {
    // endpointAuthenticator.authenticateUser(req, res);
    SalamahTransitionPolicy.create(req.body)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(500).send(err)
      });
  },
  //custom filter
  customFilterSalamahTransitionPolicy:(req,res)=>CustomFilter.customPolicyFilter(SalamahTransitionPolicy,req,res)
};
