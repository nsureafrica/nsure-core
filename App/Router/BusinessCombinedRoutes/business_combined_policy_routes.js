//@ts-check

const BusinessPolicyController = require('./../../Controllers/BusinessCombinedControllers/business_combined_policy_controller')

module.exports = app => {
    app
    .route("/policies/businessCombined/getUserPolicies")
    .get(BusinessPolicyController.getUsersPolicy);
  app
    .route("/policies/businessCombined/getOnePolicy")
    .get(BusinessPolicyController.getOnePolicy);
  app
    .route("/policies/businessCombined/createPolicy")
    .post(BusinessPolicyController.createPolicy);
  
  app
  .route("/policies/businessCombined/getAllPolicies")
  .get(BusinessPolicyController.getAllPolicies)

  app.route("/policies/businessCombined/activateBusinessCombinedPolicy").put(BusinessPolicyController.activatePolicy)

  app.route("/policies/businessCombined/exportDataAsCsv").get(BusinessPolicyController.exportDataAsCsv)
}