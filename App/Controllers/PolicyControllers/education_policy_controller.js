//@ts-check


const EducationPolicy = require("../../Models/education_policy");

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
        res.send(err);
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
        res.send(err);
      });
  },
  createEducationPolicy: (req, res) => {
    // endpointAuthenticator.authenticateUser(req, res);
    EducationPolicy.create(req.body)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.send(err);
      });
  },
}