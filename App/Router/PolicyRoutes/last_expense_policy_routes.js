//@ts-check

const LastExpensePolicyController = require('./../../Controllers/PolicyControllers/last_expense_policy_controller')

module.exports = app => {
    app
    .route("/policies/lastExpense/getUserPolicies")
    .get(LastExpensePolicyController.getUsersLastExpensePolicy);
  app
    .route("/policies/lastExpense/getOneLastExpensePolicy")
    .get(LastExpensePolicyController.getOneLastExpensePolicy);
  app
    .route("/policies/lastExpense/createPolicy")
    .post(LastExpensePolicyController.createLastExpensePolicy);
  
  app
  .route("/policies/lastExpense/getAllLastExpensePolicies")
  .get(LastExpensePolicyController.getAllLastExpensePolicies)

  app.route("/policies/lastExpense/activateLastExpensePolicy").put(LastExpensePolicyController.activateLastExpensePolicy)

  app.route("/policies/lastExpense/exportDataAsCsv").get(LastExpensePolicyController.exportDataAsCsv)
}