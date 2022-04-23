const MotorTonnageRatesController = require("./../../Controllers/RateControllers/motor_tonnage_rate_controller")

module.exports = app => {
    app
        .route("/api/motorTonnageRates/createMotorTonnageRate")
        .post(MotorTonnageRatesController.createMotorTonnageRate);

    app.route("/api/motorTonnageRates/updatemotortonnageratebyid/:id").put(MotorTonnageRatesController.updateMotorTonnageRatesById)

}