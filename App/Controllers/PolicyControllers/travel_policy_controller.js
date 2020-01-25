// @ts-check

const TravelPolicy = require("../../Models/travel_policy");
const endpointAuthenticator = require("../../Utils/endpointAuthenticator");
const CustomFilter = require("./custom_filter_policy_controller")

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
  },
  //custom filter
  customFilterTravelPolicy:(req,res)=>CustomFilter.customPolicyFilter(TravelPolicy,req,res)
};
