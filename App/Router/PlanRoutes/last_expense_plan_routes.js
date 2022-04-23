//@ts-check

const LastExpensePlanController = require("../../Controllers/PlanControllers/last_expense_plans_controller");

module.exports = app => {
  app
    .route("/api/lastExpensePlans/createLastExpensePlan")
    .post(LastExpensePlanController.createLastExpensePlan);

  app
    .route("/api/lastExpensePlans/getlastExpensePlan/:id")
    .get(LastExpensePlanController.getOneLastExpensePlan);
  app
    .route("/api/lastExpensePlans/getLastExpensePlans")
    .get(LastExpensePlanController.getAllLastExpensePlans);
  app
    .route("/api/plans/lastExpensePlans/updatelastexpenseplanbyid/:id")
    .put(LastExpensePlanController.updateLastExpensePlanById);
};
