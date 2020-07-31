//@ts-check

const IncomeProtectionPolicyRateController = require("./../../Controllers/IncomeProtectionControllers/income_protection_rates_controllers");

module.exports = app => {
  app
    .route("/incomeProtectionRate/createRate")
    .post(IncomeProtectionPolicyRateController.createRate);

  app
    .route("/incomeProtectionRate/getAllRates")
    .get(IncomeProtectionPolicyRateController.getAllRates);

  app
    .route("/rates/incomeProtectionRate/getAllRatesGroupedByUnderwritter")
    .get(IncomeProtectionPolicyRateController.getAllGroupedByUnderwriters);

  app
    .route("/rates/incomeProtectionRate/getRateByPlanId/:planId")
    .get(IncomeProtectionPolicyRateController.getRateByPlanId);
  app
    .route("/rates/incomeProtectionRate/updateRateById/:id")
    .put(IncomeProtectionPolicyRateController.updateRateById);
};
