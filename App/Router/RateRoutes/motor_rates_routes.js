//@ts-check

const motorRatesController = require("../../Controllers/RateControllers/motor_rates_controller");

module.exports = app => {
  app
    .route("/api/motorRates/createMotorRate")
    .post(motorRatesController.createMotorRate);
  app
    .route("/api/motorRates/getMotorRate/:id")
    .get(motorRatesController.getOneMotorRate);
  app
    .route("/api/motorRates/getAllMotorRates")
    .get(motorRatesController.getAllMotorRates);
  app
    .route("/api/motorRates/getMotorRates")
    .get(motorRatesController.getMotorRates);

  app.route("/api/motorRates/updatemotorratebyid/:id").put(motorRatesController.updateMotorRatesById)
};
