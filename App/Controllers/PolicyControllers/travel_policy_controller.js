// @ts-check

const TravelPolicy = require("../../Models/travel_policy");
const endpointAuthenticator = require("../../Utils/endpointAuthenticator");

module.exports = {
  getUserTravelPolicy: (req, res) => {
    // endpointAuthenticator.authenticateUser(req, res);
    TravelPolicy.findAll({
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
  getTravelPolicy: (req, res) => {
    // endpointAuthenticator.authenticateUser(req, res);
    TravelPolicy.findOne({
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
  createTravelPolicy: (req, res) => {
    // endpointAuthenticator.authenticateUser(req, res);
    TravelPolicy.create(req.body)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(500).send(err)
      });
  }
};
