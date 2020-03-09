//@ts-check
const chalk = require("chalk");
const MotorClass = require("../../../Models/motor_vehicle_class");

module.exports = {
  getMotorClass: (req, res) => {
    MotorClass.findAll()
      .then(classes => {
        res.send(classes);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  getOneMotorClass: (req, res) => {
    MotorClass.findAll()
      .then(classes => {
        res.send(classes);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  //Create a motor class
  createMotorClass: (req, res) => {
    MotorClass.create(req.body)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
};
