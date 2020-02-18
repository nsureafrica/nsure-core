//@ts-check

const motorClassController = require('./../../../Controllers/PolicyControllers/Motor/motor_class_controller')

module.exports = app => {
    app.route("/motorclass/createMotorClass").post(motorClassController.createMotorClass);
    app.route("/motorclass/getMotorClasses").get(motorClassController.getOneMotorClass);
}