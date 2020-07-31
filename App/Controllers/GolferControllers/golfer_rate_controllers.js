//@ts-check

const GolferRateModel = require("./../../Models/golfers_policy_rates");
const SharedRateControllers = require("./../RateControllers/shared_rate_controllers")
const SharedControllers = require("./../SharedControllers/shared_controllers")
module.exports = {
  createRate: (req, res) => {
    GolferRateModel.create(req.body)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  getOneRate: (req, res) => {
    GolferRateModel.findAll({
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
  getRates: (req, res) => {
    GolferRateModel.findAll({
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
  getAllGroupedByUnderwriters: (req, res) => {
    SharedRateControllers.getGroupedByFieldRates(req, res, "UnderwriterId",GolferRateModel);
  },
  getAllRates: (req, res) => {
    GolferRateModel.findAll()
      .then(rates => {
        res.send(rates);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  updateRateById: (req,res) => {
    SharedControllers.updateEntryById(req,res,GolferRateModel)
  },
  getRateByPlanId: (req,res) => {
    SharedRateControllers.getRateByPlanId(req,res,GolferRateModel)
  },
};
