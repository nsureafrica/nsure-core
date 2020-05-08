//@ts-check

const DomesticPolicyController = require('./../../Controllers/DomesticPolicyControllers/domestic_policy_controller')

module.exports = app => {
    app
    .route("/policies/domestic/getUserPolicies")
    .get(DomesticPolicyController.getUsersPolicy);
  app
    .route("/policies/domestic/getOneLastExpensePolicy")
    .get(DomesticPolicyController.getOnePolicy);
  app
    .route("/policies/domestic/createPolicy")
    .post(DomesticPolicyController.createPolicy);
  
  app
  .route("/policies/lastExpense/getAllDomesticPolicies")
  .get(DomesticPolicyController.getAllPolicies)

  app.route("/policies/domestic/activateDomesticPolicy").put(DomesticPolicyController.activatePolicy)

  app.route("/policies/domestic/exportDataAsCsv").get(DomesticPolicyController.exportDataAsCsv)
}