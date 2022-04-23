//@ts-check

const motorClassController = require('./../../../Controllers/PolicyControllers/Motor/motor_class_controller')

module.exports = app => {
    app.route("/api/motorclass/createMotorClass").post(motorClassController.createMotorClass);
    app.route("/api/motorclass/getMotorClasses").get(motorClassController.getOneMotorClass);
}