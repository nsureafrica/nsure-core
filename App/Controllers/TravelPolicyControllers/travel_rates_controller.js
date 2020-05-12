//@ts-check

const TravelRatesModel = require("./../../Models/travel_policy_rates");
const SharedControllers = require("./../SharedControllers/shared_controllers");
const SharedRateControllers = require("./../RateControllers/shared_rate_controllers");
module.exports = {
  createRate: (req, res) => {
    TravelRatesModel.create(req.body)
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  getOneRate: (req, res) => {
    TravelRatesModel.findAll({
      where: {
        id: req.params.id,
      },
    })
      .then((rates) => {
        res.send(rates);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  getAllRates: (req, res) => {
    TravelRatesModel.findAll()
      .then((rates) => {
        res.send(rates);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  updateRateById: (req, res) => {
    SharedControllers.updateEntryById(req, res, TravelRatesModel);
  },
  getRateByPlanId: (req, res) => {
    SharedRateControllers.getRateByPlanId(req, res, TravelRatesModel);
  },
  getAllRatesGroupedByType: (req, res) => {
    SharedRateControllers.getGroupedByFieldRates(req, res, "type",TravelRatesModel);
  },
};
