//@ts-check

const lastexpenseratecontroller = require("./../../Controllers/RateControllers/last_expense_rate_controller");

module.exports = app => {
  app
    .route("/lastexpenserate/createlastexpenserate")
    .post(lastexpenseratecontroller.createLastExpenseRate);

  app
    .route("/lastexpenserate/getalllastexpenserates")
    .get(lastexpenseratecontroller.getAllLastExpenseRates);

  app
    .route("rates/lastexpenserate/getalllastexpenseratesgroupedbyunderwriter")
    .get(lastexpenseratecontroller.getAllLastExpenseRatesGroupedByUnderwriters);
};
