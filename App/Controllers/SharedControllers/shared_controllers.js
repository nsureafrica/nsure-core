//@ts-check

const Bill = require("./../../Models/Bill");

module.exports = {
  //get all policies
  //get all by user id

  getAllPolicies: (req, res, model) => {
    model
      .findAll({
        order: [["updatedAt", "DESC"]]
      })
      .then(policies => {
        res.status(200).send(policies);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  // get one policy by policyId

  getOnePolicyById: (req, res, model) => {
    model
      .findAll({
        order: [["updatedAt", "DESC"]],
        where: {
          id: req.params.policyId
        }
      })
      .then(policies => {
        res.status(200).send(policies);
      })
      .catch(error => {
        res.status(500).send(error);
      });
  },

  getAllPoliciesByUserId: (req, res, model) => {
    model
      .findAll({
        order: [["updatedAt", "DESC"]]
      })
      .then(polciies => {
        res.status(200).send(polciies);
      })
      .catch(error => {
        res.status(500).send(error);
      });
  },
  createPolicy: (req, res, model) => {
    Bill.create({
      amount: req.body.quoteAmount
    }).then(billResponse => {
      const billId = { BillId: billResponse.dataValues.id };
      Object.assign(req.body, billId);
      model
        .create(req.body)
        .then(response => {
          console.log(response);
          res.status(200).send(response);
        })
        .catch(err => {
          res.status(500).send(err);
        });
    });
  }
};
