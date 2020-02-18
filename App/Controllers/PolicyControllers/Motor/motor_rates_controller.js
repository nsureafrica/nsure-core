//@ts-check
const chalk = require("chalk");
const MotorRates = require("../../../Models/motor_rates");

module.exports = {
  getMotorRates: (req, res) => {
    // endpointAuthenticator.authenticateUser(req, res);
    MotorRates.findAll({
      where: {
        userId: req.params.userId
      }
    })
      .then(rates => {
        console.log(chalk.blue(rates));
        res.send(rates);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  //Create a motor rate
  createMotorRate: (req, res) => {
    // endpointAuthenticator.authenticateUser(req, res);
    MotorRates.create(req.body)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
};
