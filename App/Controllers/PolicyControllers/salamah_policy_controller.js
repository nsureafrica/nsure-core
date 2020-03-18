// @ts-check

const SalamahTransitionPolicy = require("../../Models/salamah_policy");
const CustomFilter = require("./custom_filter_policy_controller")

module.exports = {

  getUserSalamahTransitionPolicies: (req, res) => {
   SalamahTransitionPolicy.findAll({
      where: {
        UserId: req.user.id
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
    SalamahTransitionPolicy.create(req.body)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(500).send(err)
      });
  },

  getAllSalamahPolices:(req,res)=> {
    SalamahTransitionPolicy.findAll()
    .then(response => {
      response.send(response)
    })
    .catch(error => {
      res.status(500).send(error)
    });
    
  },
  //custom filter
  customFilterSalamahTransitionPolicy:(req,res)=>CustomFilter.customPolicyFilter(SalamahTransitionPolicy,req,res)
};
