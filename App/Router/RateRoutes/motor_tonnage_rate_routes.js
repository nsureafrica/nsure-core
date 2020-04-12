const MotorTonnageRatesController = require("./../../Controllers/RateControllers/motor_tonnage_rate_controller")

module.exports = app => {
    app
    .route("/motorTonnageRates/createMotorTonnageRate")
    .post(MotorTonnageRatesController.createMotorTonnageRate);  

    app.route("/motorTonnageRates/updatemotortonnageratebyid/:id").put(MotorTonnageRatesController.updateMotorTonnageRatesById)

}