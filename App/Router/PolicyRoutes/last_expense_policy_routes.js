//@ts-check

const LastExpensePolicyController = require('./../../Controllers/PolicyControllers/last_expense_policy_controller')

module.exports = app => {
  app
    .route("/api/policies/lastExpense/getUserPolicies")
    .get(LastExpensePolicyController.getUsersLastExpensePolicy);
  app
    .route("/api/policies/lastExpense/getOneLastExpensePolicy")
    .get(LastExpensePolicyController.getOneLastExpensePolicy);
  app
    .route("/api/policies/lastExpense/createPolicy")
    .post(LastExpensePolicyController.createLastExpensePolicy);

  app
    .route("/api/policies/lastExpense/getAllLastExpensePolicies")
    .get(LastExpensePolicyController.getAllLastExpensePolicies)

  app.route("/api/policies/lastExpense/activateLastExpensePolicy").put(LastExpensePolicyController.activateLastExpensePolicy)

  app.route("/api/policies/lastExpense/exportDataAsCsv").get(LastExpensePolicyController.exportDataAsCsv)
}