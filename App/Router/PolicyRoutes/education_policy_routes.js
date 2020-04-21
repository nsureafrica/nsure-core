//@ts-check
const EducationPolicyController = require("../../Controllers/PolicyControllers/education_policy_controller");

module.exports = (app) => {
  app
    .route("/policies/education/getUserPolicies")
    .get(EducationPolicyController.getUserEducationPolicies);
  app
    .route("/policies/education/getOneEducationPolicy/:policyId")
    .get(EducationPolicyController.getEducationPolicy);
  app
    .route("/policies/education/createEducationPolicy")
    .post(EducationPolicyController.createEducationPolicy);

  app
    .route("/policies/education/getAllEducationPolicies")
    .get(EducationPolicyController.getAllEducationPolicies);

  app
    .route("/policies/education/activateEducationPolicy")
    .put(EducationPolicyController.activateEducationPolicy);

  app
    .route("/policies/education/exportDataAsCsv")
    .get(EducationPolicyController.exportDataAsCsv);
};
