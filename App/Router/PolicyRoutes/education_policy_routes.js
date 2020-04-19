//@ts-check
const EducationPolicyController = require("../../Controllers/PolicyControllers/education_policy_controller");

module.exports = (app) => {
  app
    .route("/policies/education/:userId")
    .get(EducationPolicyController.getUserEducationPolicies);
  app
    .route("/policies/education/policy/:policyId")
    .get(EducationPolicyController.getEducationPolicy);
  app
    .route("/policies/education/policy")
    .post(EducationPolicyController.createEducationPolicy);

  app
    .route("/policies/alleducationpolicies")
    .get(EducationPolicyController.getAllEducationPolicies);

  app
    .route("/policies/education/activateEducationPolicy")
    .put(EducationPolicyController.activateEducationPolicy);

  app
    .route("/policies/education/exportDataAsCsv")
    .get(EducationPolicyController.exportDataAsCsv);
};
