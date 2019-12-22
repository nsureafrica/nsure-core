TravelPolicy = require("../../Models/travel_policy");
module.exports = {
  getUserTravelPolicy: (req, res) => {
    TravelPolicy.findAll({
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
  getTravelPolicy: (req, res) => {
    TravelPolicy.findOne({
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
  createTravelPolicy: (req, res) => {
    TravelPolicy.create(req.body)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.send(err);
      });
  }
};
