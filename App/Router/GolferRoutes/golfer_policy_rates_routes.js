//@ts-check

const GolferPolicyRatesController = require("./../../Controllers/GolferControllers/golfer_rate_controllers");

module.exports = app => {
  app
    .route("/api/golferRate/createRate")
    .post(GolferPolicyRatesController.createRate);

  app
    .route("/api/golferRate/getAllRates")
    .get(GolferPolicyRatesController.getAllRates);

  app
    .route("/api/rates/golferRate/getAllRatesGroupedByUnderwritter")
    .get(GolferPolicyRatesController.getAllGroupedByUnderwriters);

  app
    .route("/api/rates/golferRate/getRateByPlanId/:planId")
    .get(GolferPolicyRatesController.getRateByPlanId);
  app
    .route("/api/rates/golferRate/updateRateById/:id")
    .put(GolferPolicyRatesController.updateRateById);
};
