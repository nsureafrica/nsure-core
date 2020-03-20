//@ts-check

const LastExpenseRateModel = require("./../../Models/last_expense_rates");
const SharedRateControllers = require("./shared_rate_controllers")
const SharedControllers = require("./../SharedControllers/shared_controllers")
module.exports = {
  createLastExpenseRate: (req, res) => {
    LastExpenseRateModel.create(req.body)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  getOneLastExpenseRate: (req, res) => {
    LastExpenseRateModel.findAll({
      where: {
        userId: req.user.id
      }
    })
      .then(rates => {
        res.send(rates);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  getLastExpenseRates: (req, res) => {
    LastExpenseRateModel.findAll({
      where: {
        userId: req.user.id
      }
    })
      .then(rates => {
        res.send(rates);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  getAllLastExpenseRatesGroupedByUnderwriters: (req, res) => {
    SharedRateControllers.getGroupedByFieldRates(req, res, "UnderwriterId",LastExpenseRateModel);
  },
  getAllLastExpenseRates: (req, res) => {
    LastExpenseRateModel.findAll()
      .then(rates => {
        res.send(rates);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  updateLastExpenseRatesById: (req,res) => {
    SharedControllers.updateEntryById(req,res,LastExpenseRateModel)
  },
  getLastExpenseRateByPlanId: (req,res) => {
    SharedRateControllers.getRateByPlanId(req,res,LastExpenseRateModel)
  },
};
