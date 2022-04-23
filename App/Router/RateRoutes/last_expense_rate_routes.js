//@ts-check

const lastexpenseratecontroller = require("./../../Controllers/RateControllers/last_expense_rate_controller");

module.exports = app => {
  app
    .route("/api/lastexpenserate/createlastexpenserate")
    .post(lastexpenseratecontroller.createLastExpenseRate);

  app
    .route("/api/lastexpenserate/getalllastexpenserates")
    .get(lastexpenseratecontroller.getAllLastExpenseRates);

  app
    .route("/api/rates/lastexpenserate/getalllastexpenseratesgroupedbyunderwriter")
    .get(lastexpenseratecontroller.getAllLastExpenseRatesGroupedByUnderwriters);

  app
    .route("/api/rates/lastexpenserate/getlastexpenseratebyplanid/:planId")
    .get(lastexpenseratecontroller.getLastExpenseRateByPlanId);
  app
    .route("/api/rates/lastexpenserate/updatelastexpenseratebyid/:id")
    .put(lastexpenseratecontroller.updateLastExpenseRatesById);
};
