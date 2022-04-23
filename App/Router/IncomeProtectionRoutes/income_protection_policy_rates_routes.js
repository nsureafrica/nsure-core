//@ts-check

const IncomeProtectionPolicyRateController = require("./../../Controllers/IncomeProtectionControllers/income_protection_rates_controllers");

module.exports = app => {
  app
    .route("/api/incomeProtectionRate/createRate")
    .post(IncomeProtectionPolicyRateController.createRate);

  app
    .route("/api/incomeProtectionRate/getAllRates")
    .get(IncomeProtectionPolicyRateController.getAllRates);

  app
    .route("/api/rates/incomeProtectionRate/getAllRatesGroupedByUnderwritter")
    .get(IncomeProtectionPolicyRateController.getAllGroupedByUnderwriters);

  app
    .route("/api/rates/incomeProtectionRate/getRateByPlanId/:planId")
    .get(IncomeProtectionPolicyRateController.getRateByPlanId);
  app
    .route("/api/rates/incomeProtectionRate/updateRateById/:id")
    .put(IncomeProtectionPolicyRateController.updateRateById);
};
