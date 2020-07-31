//@ts-check

const IncomePolicyRateModel = require("./../../Models/income_protection_rates");
const SharedRateControllers = require("./../RateControllers/shared_rate_controllers")
const SharedControllers = require("./../SharedControllers/shared_controllers")
module.exports = {
  createRate: (req, res) => {
    IncomePolicyRateModel.create(req.body)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  getOneRate: (req, res) => {
    IncomePolicyRateModel.findAll({
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
    IncomePolicyRateModel.findAll({
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
    SharedRateControllers.getGroupedByFieldRates(req, res, "UnderwriterId",IncomePolicyRateModel);
  },
  getAllRates: (req, res) => {
    IncomePolicyRateModel.findAll()
      .then(rates => {
        res.send(rates);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  updateRateById: (req,res) => {
    SharedControllers.updateEntryById(req,res,IncomePolicyRateModel)
  },
  getRateByPlanId: (req,res) => {
    SharedRateControllers.getRateByPlanId(req,res,IncomePolicyRateModel)
  },
};
