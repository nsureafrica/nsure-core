//@ts-check

const LastExpensePlanModel = require("./../../Models/last_expense_plans");
const UnderwriterModel = require("../../Models/underwriters");
const SharedControllers = require("./../SharedControllers/shared_controllers")
module.exports = {
  createLastExpensePlan: (req, res) => {
    LastExpensePlanModel.create(req.body)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  getOneLastExpensePlan: (req, res) => {
    LastExpensePlanModel.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(rates => {
        res.send(rates);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  getAllLastExpensePlans: (req, res) => {
    LastExpensePlanModel.findAll({
      include: [UnderwriterModel]
    })
      .then(rates => {
        res.send(rates);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  updateLastExpensePlanById: (req,res) => {
    SharedControllers.updateEntryById(req,res,LastExpensePlanModel)
  }
};
