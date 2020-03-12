//@ts-check

const MedicalPolicy = require("../../Models/medical_policy");
const CustomFilter = require("./custom_filter_policy_controller");
const Bill = require("./../../Models/Bill");

module.exports = {
  //medical policy
  getUserMedicalPolicies: (req, res) => {
    MedicalPolicy.findAll({
      order: [["updatedAt", "DESC"]],
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
      const billId = { BillId: billResponse.dataValues.id };
      Object.assign(req.body, billId);
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
    MedicalPolicy.findAll({
      order: [["updatedAt", "DESC"]]
    })
      .then(medicalPolicies => {
        res.status(200).send(medicalPolicies);
      })
      .catch(error => {
        res.status(200).send(error);
      });
  },
  //custom filter
  customFilterMedicalPolicy: (req, res) =>
    CustomFilter.customPolicyFilter(MedicalPolicy, req, res)
};
