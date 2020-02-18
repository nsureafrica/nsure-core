//@ts-check

const motorRatesController = require('./../../../Controllers/PolicyControllers/Motor/motor_rates_controller')

module.exports = app => {
    app.route("/motorRates/createMotorRate").post(motorRatesController.createMotorRate);
    app.route("/motorRates/getMotorRate/:id").get(motorRatesController.getOneMotorRate);
    app.route("/motorRates/getAllMotorRates").get(motorRatesController.getAllMotorRates);
    app.route("/motorRates/getMotorRates").get(motorRatesController.getMotorRates);


}