//@ts-check
const MedicalPolicyController = require("../../Controllers/PolicyControllers/medical_policy_controller");

module.exports = (app) => {
  app
    .route("/policies/medical/getUserPolicies")
    .get(MedicalPolicyController.getUserMedicalPolicies);
  app
    .route("/policies/medical/getMedicalPolicy")
    .get(MedicalPolicyController.getMedicalPolicy);
  app
    .route("/policies/medical/createMedicalPolicy")
    .post(MedicalPolicyController.createMedicalPolicy);

  app
    .route("/policies/medical/getAllMedicalPolicies")
    .get(MedicalPolicyController.getAllMedicalPolicies);

  app
    .route("/policies/medical/activateMedicalPolicy")
    .put(MedicalPolicyController.activateMedicalPolicy);

  app
    .route("/policies/medical/exportDataAsCsv")
    .get(MedicalPolicyController.exportDataAsCsv);
};
