//@ts-check

const medicalRatesController = require("../../Controllers/RateControllers/medical_rate_controller");

module.exports = app => {
  app
    .route("/medicalRates/createMedicalRate")
    .post(medicalRatesController.createMedicalRate);
  app
    .route("/medicalRates/getMedicalRate/:id")
    .get(medicalRatesController.getOneMedicalRate);
  app
    .route("/medicalRates/getAllMedicalRates")
    .get(medicalRatesController.getAllMedicalRates);
  app
    .route("/medicalRates/getMedicalRates")
    .get(medicalRatesController.getMedicalRates);
  app
    .route("/medicalRates/getallmedicalratesgroupedbyunderwriter")
    .get(medicalRatesController.getAllMedicalRatesGroupedByUnderwriters);

  app
    .route("/rates/medicalRates/getmedicalratesbyplanid/:id")
    .get(medicalRatesController.getMedicalRateByPlanId);
  app
    .route("/medicalRates/updatemedicalratebyid/:id")
    .put(medicalRatesController.updateMedicalRatesById);
};
