//@ts-check
const MedicalPolicyController = require("../../Controllers/PolicyControllers/medical_policy_controller");

module.exports = (app) => {
  app
    .route("/api/policies/medical/getUserPolicies")
    .get(MedicalPolicyController.getUserMedicalPolicies);
  app
    .route("/api/policies/medical/getMedicalPolicy")
    .get(MedicalPolicyController.getMedicalPolicy);
  app
    .route("/api/policies/medical/createMedicalPolicy")
    .post(MedicalPolicyController.createMedicalPolicy);

  app
    .route("/api/policies/medical/getAllMedicalPolicies")
    .get(MedicalPolicyController.getAllMedicalPolicies);

  app
    .route("/api/policies/medical/activateMedicalPolicy")
    .put(MedicalPolicyController.activateMedicalPolicy);

  app
    .route("/api/policies/medical/exportDataAsCsv")
    .get(MedicalPolicyController.exportDataAsCsv);
};
