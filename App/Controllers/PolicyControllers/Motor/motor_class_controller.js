//@ts-check
const chalk = require("chalk");
const MotorRates = require("../../../Models/motor_rates");

module.exports = {
  getMotorClass: (req, res) => {
    // endpointAuthenticator.authenticateUser(req, res);
    MotorRates.findAll({
      where: {
        id: req.params.id
      }
    })
      .then(classes => {
        console.log(chalk.blue(classes));
        res.send(classes);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  //Create a motor class
  createMotorClass: (req, res) => {
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
