//@ts-check

const MedicalPolicy = require("../../Models/medical_policy");
const CustomFilter = require("./custom_filter_policy_controller");
const QuoteController = require("../quote_controller");
const Bill = require("./../../Models/Bill");

module.exports = {
  //medical policy
  getUserMedicalPolicies: (req, res) => {
    MedicalPolicy.findAll({
      where: {
        userId: req.user.id
      }
    })
      .then(policies => {
        res.status(200).send(policies);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  getMedicalPolicy: (req, res) => {
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
    Bill.create({
      amount: req.body.quoteAmount
    }).then(billResponse => {
      MedicalPolicy.create(req.body)
        .then(response => {
          console.log(response);
          res.status(200).send(response);
        })
        .catch(err => {
          res.status(500).send(err);
        });
    });
  },
  //get all medical policies
  getAllMedicalPolicies: (req, res) => {
    MedicalPolicy.findAll()
      .then(medicalPolicies => {
        res.status(200).send(medicalPolicies);
      })
      .catch(error => {
        res.status(200).send(error);
      });
  },

  //custom filter
  customfilterMedicalPolicy: (req, res) => {
    MedicalPolicy.findAll({
      where: req.body.customFilter
    })
      .then(policy => {
        res.send(policy);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  //custom filter
  customFilterMedicalPolicy: (req, res) =>
    CustomFilter.customPolicyFilter(MedicalPolicy, req, res)
};
