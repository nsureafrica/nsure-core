//@ts-check

const EducationPolicy = require("../../Models/education_policy");
const CustomFilter = require("./custom_filter_policy_controller")
module.exports = {
  //education policies
  getUserEducationPolicies: (req, res) => {
    // endpointAuthenticator.authenticateUser(req, res);
    EducationPolicy.findAll({
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
  getEducationPolicy: (req, res) => {
    // endpointAuthenticator.authenticateUser(req, res);
    EducationPolicy.findOne({
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
  createEducationPolicy: (req, res) => {
    // endpointAuthenticator.authenticateUser(req, res);
    EducationPolicy.create(req.body)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  //custom filter
  customFilterEducationPolicy:(req,res)=>CustomFilter.customPolicyFilter(EducationPolicy,req,res)
};
