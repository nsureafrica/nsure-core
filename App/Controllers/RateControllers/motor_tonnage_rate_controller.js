//@ts-check

const MotorTonnageRateModel = require("./../../Models/motor_tonnage_rates")
const SharedControllers = require("./shared_rate_controllers")
module.exports = {

  createMotorTonnageRate: (req, res) => {
    MotorTonnageRateModel.create(req.body)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  updateMotorTonnageRatesById: (req,res) => {
    SharedControllers.updateEntryById(req,res,MotorTonnageRateModel)
  }
}