//@ts-check

const MedicalPolicy = require("../../Models/medical_policy");
const endpointAuthenticator = require("../../Utils/endpointAuthenticator")

module.exports = {
  //medical policy
  getUserMedicalPolicies: (req, res) => {
    // endpointAuthenticator.authenticateUser(req, res);
    MedicalPolicy.findAll({
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
  getMedicalPolicy: (req, res) => {
    // endpointAuthenticator.authenticateUser(req, res);
    MedicalPolicy.findOne({
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
  createMedicalPolicy: (req, res) => {
    endpointAuthenticator.authenticateUser(req, res);
    MedicalPolicy.create(req.body)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  //custom filter
  customfilterMedicalPolicy: (req, res) => {
    // endpointAuthenticator.authenticateUser(req, res);
    MedicalPolicy.findAll({
      where: req.body.customFilter
    })
      .then(policy => {
        res.send(policy);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
};
