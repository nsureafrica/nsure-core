//@ts-check

const LastExpensePlanController = require("../../Controllers/PlanControllers/last_expense_plans_controller");

module.exports = app => {
  app
    .route("/lastExpensePlans/createLastExpensePlan")
    .post(LastExpensePlanController.createLastExpensePlan);

  app
    .route("/lastExpensePlans/getlastExpensePlan/:id")
    .get(LastExpensePlanController.getOneLastExpensePlan);
  app
    .route("/lastExpensePlans/getLastExpensePlans")
    .get(LastExpensePlanController.getAllLastExpensePlans);
};
