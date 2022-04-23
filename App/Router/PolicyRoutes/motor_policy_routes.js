//@ts-check

const MotorPolicyController = require("./../../Controllers/PolicyControllers/motor_policy_controller");
const Storage = require("../../Storage/storage");

module.exports = (app) => {
  // Motor Policies
  app
    .route("/api/policies/getUserPolicies")
    .get(MotorPolicyController.getUserMotorPolicies); // requires auth
  app
    .route("/api/policies/getMedicalPolicy")
    .get(MotorPolicyController.getMotorPolicy); // requires auth
  app.post(
    "/api/policies/policy",
    Storage.uploadLogbook.fields([
      { name: "logbook", maxCount: 5 },
      { name: "kraPin", maxCount: 5 },
      { name: "nationalID", maxCount: 5 },
    ]),
    MotorPolicyController.createMotorPolicy
  ); // requires auth

  app
    .route("/api/policies/getAllMotorPolicies")
    .get(MotorPolicyController.getAllMotorPolicies);

  app
    .route("/api/policies/activateMotorPolicy")
    .put(MotorPolicyController.activateMotorPolicy);
  app
    .route("/api/policies/exportDataAsCsv")
    .get(MotorPolicyController.exportDataAsCsv);
};
