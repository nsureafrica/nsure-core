//@ts-check

const BusinessPolicyController = require('./../../Controllers/BusinessCombinedControllers/business_combined_policy_controller')

module.exports = app => {
  app
    .route("/api/policies/businessCombined/getUserPolicies")
    .get(BusinessPolicyController.getUsersPolicy);
  app
    .route("/api/policies/businessCombined/getOnePolicy")
    .get(BusinessPolicyController.getOnePolicy);
  app
    .route("/api/policies/businessCombined/createPolicy")
    .post(BusinessPolicyController.createPolicy);

  app
    .route("/api/policies/businessCombined/getAllPolicies")
    .get(BusinessPolicyController.getAllPolicies)

  app.route("/api/policies/businessCombined/activateBusinessCombinedPolicy").put(BusinessPolicyController.activatePolicy)

  app.route("/api/policies/businessCombined/exportDataAsCsv").get(BusinessPolicyController.exportDataAsCsv)
}