//@ts-check
const EducationPolicyController = require("../../Controllers/PolicyControllers/education_policy_controller");

module.exports = (app) => {
  app
    .route("/api/policies/education/getUserPolicies")
    .get(EducationPolicyController.getUserEducationPolicies);
  app
    .route("/api/policies/education/getOneEducationPolicy/:policyId")
    .get(EducationPolicyController.getEducationPolicy);
  app
    .route("/api/policies/education/createEducationPolicy")
    .post(EducationPolicyController.createEducationPolicy);

  app
    .route("/api/policies/education/getAllEducationPolicies")
    .get(EducationPolicyController.getAllEducationPolicies);

  app
    .route("/api/policies/education/activateEducationPolicy")
    .put(EducationPolicyController.activateEducationPolicy);

  app
    .route("/api/policies/education/exportDataAsCsv")
    .get(EducationPolicyController.exportDataAsCsv);
};
