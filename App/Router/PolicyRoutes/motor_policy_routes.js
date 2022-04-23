//@ts-check

const MotorPolicyController = require("./../../Controllers/PolicyControllers/motor_policy_controller");
const Storage = require("../../Storage/storage");

module.exports = (app) => {
  // Motor Policies
  app
    .route("/api/policies/motor/getUserPolicies")
    .get(MotorPolicyController.getUserMotorPolicies); // requires auth
  app
    .route("/api/policies/motor/getMedicalPolicy")
    .get(MotorPolicyController.getMotorPolicy); // requires auth
  app.post(
    "/api/policies/motor/policy",
    Storage.uploadLogbook.fields([
      { name: "logbook", maxCount: 5 },
      { name: "kraPin", maxCount: 5 },
      { name: "nationalID", maxCount: 5 },
    ]),
    MotorPolicyController.createMotorPolicy
  ); // requires auth

  app
    .route("/api/policies/motor/getAllMotorPolicies")
    .get(MotorPolicyController.getAllMotorPolicies);

  app
    .route("/api/policies/motor/activateMotorPolicy")
    .put(MotorPolicyController.activateMotorPolicy);
  app
    .route("/api/policies/motor/exportDataAsCsv")
    .get(MotorPolicyController.exportDataAsCsv);
};
