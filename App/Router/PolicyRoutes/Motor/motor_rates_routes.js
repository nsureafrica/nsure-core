//@ts-check

const motorRatesController = require('./../../../Controllers/PolicyControllers/Motor/motor_rates_controller')

module.exports = app => {
    // app.route("/createMotorRate").post(motorRatesController.createMotorClass);
    app.route("/getMotorRate/:id").get(motorRatesController.getMotorRates);
}