//@ts-check

const GolferPolicyRatesController = require("./../../Controllers/GolferControllers/golfer_rate_controllers");

module.exports = app => {
  app
    .route("/golferRate/createRate")
    .post(GolferPolicyRatesController.createRate);

  app
    .route("/golferRate/getAllRates")
    .get(GolferPolicyRatesController.getAllRates);

  app
    .route("/rates/golferRate/getAllRatesGroupedByUnderwritter")
    .get(GolferPolicyRatesController.getAllGroupedByUnderwriters);

  app
    .route("/rates/golferRate/getRateByPlanId/:planId")
    .get(GolferPolicyRatesController.getRateByPlanId);
  app
    .route("/rates/golferRate/updateRateById/:id")
    .put(GolferPolicyRatesController.updateRateById);
};
