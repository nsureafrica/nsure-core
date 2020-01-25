//@ts-check
const MedicalPolicyController = require("../../Controllers/PolicyControllers/medical_policy_controller")

module.exports = app => {
    app
    .route("/policies/medical/:userId")
    .get(MedicalPolicyController.getUserMedicalPolicies);
  app
    .route("/policies/medical/policy/:policyId")
    .get(MedicalPolicyController.getMedicalPolicy);
  app
    .route("/policies/medical/policy")
    .post(MedicalPolicyController.createMedicalPolicy);
}