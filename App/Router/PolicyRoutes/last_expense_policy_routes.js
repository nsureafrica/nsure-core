//@ts-check

const LastExpensePolicyController = require('./../../Controllers/PolicyControllers/last_expense_policy_controller')

module.exports = app => {
    app
    .route("/policies/lastexpense/:userId")
    .get(LastExpensePolicyController.getUsersLastExpensePolicy);
  app
    .route("/policies/lastexpense/policy/:policyId")
    .get(LastExpensePolicyController.getOneLastExpensePolicy);
  app
    .route("/policies/lastexpense/createpolicy")
    .post(LastExpensePolicyController.createLastExpensePolicy);
  
  app
  .route("/policies/alllastexpensepolicies")
  .get(LastExpensePolicyController.getAllLastExpensePolicies)

  app.route("/policies/lastexpense/activateLastExpensePolicy").put(LastExpensePolicyController.activateLastExpensePolicy)
}