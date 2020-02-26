//@ts-check

const MotorPolicyController = require("./../../Controllers/PolicyControllers/motor_policy_controller");
const Storage = require("../../Storage/storage");

module.exports = app => {
  // Motor Policies
  app
    .route("/policies/motor/:email")
    .get(MotorPolicyController.getUserMotorPolicies); // requires auth
  app
    .route("/policies/motor/policy/:policyId")
    .get(MotorPolicyController.getMotorPolicy); // requires auth
  app.post(
    "/policies/motor/policy",
    Storage.uploadLogbook.fields([{ name: "logbook", maxCount: 5 }]),
    MotorPolicyController.createMotorPolicy
  ); // requires auth
};
