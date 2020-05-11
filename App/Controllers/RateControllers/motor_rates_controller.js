//@ts-check
const MotorRates = require("../../Models/motor_rates");
const SharedRateControllers = require("./shared_rate_controllers");
const SharedControllers = require("./../SharedControllers/shared_controllers");

module.exports = {
  getOneMotorRate: (req, res) => {
    MotorRates.findAll({
      where: {
        userId: req.user.id,
      },
    })
      .then((rates) => {
        res.send(rates);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  //this is get user motor rates
  getMotorRates: (req, res) => {
    MotorRates.findAll({
      where: {
        userId: req.user.id,
      },
    })
      .then((rates) => {
        res.send(rates);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  getAllMotorRates: (req, res) => {
    MotorRates.findAll({})
      .then((rates) => {
        res.send(rates);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  //

  getAllMotorRatesGroupedByUnderwriters: (req, res) => {
    SharedRateControllers.getGroupedByFieldRates(
      req,
      res,
      "UnderwriterId",
      MotorRates
    );
  },

  //Create a motor rate
  createMotorRate: (req, res) => {
    MotorRates.create(req.body)
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  updateMotorRatesById: (req, res) => {
    SharedControllers.updateEntryById(req, res, MotorRates);
  },
};
