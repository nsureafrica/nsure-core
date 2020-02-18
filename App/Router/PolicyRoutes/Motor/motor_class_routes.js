//@ts-check

const motorClassController = require('./../../../Controllers/PolicyControllers/Motor/motor_class_controller')

module.exports = app => {
    app.route("/createMotorClass").post(motorClassController.createMotorClass);
    app.route("/getMotorClass/:id").get(motorClassController.getMotorClass);
}