//@ts-check

const medicalRatesController = require("../../Controllers/RateControllers/medical_rate_controller");

module.exports = app => {
  app
    .route("/api/medicalRates/createMedicalRate")
    .post(medicalRatesController.createMedicalRate);
  app
    .route("/api/medicalRates/getMedicalRate/:id")
    .get(medicalRatesController.getOneMedicalRate);
  app
    .route("/api/medicalRates/getAllMedicalRates")
    .get(medicalRatesController.getAllMedicalRates);
  app
    .route("/api/medicalRates/getMedicalRates")
    .get(medicalRatesController.getMedicalRates);
  app
    .route("/api/medicalRates/getallmedicalratesgroupedbyunderwriter")
    .get(medicalRatesController.getAllMedicalRatesGroupedByUnderwriters);

  app
    .route("/api/rates/medicalRates/getmedicalratesbyplanid/:id")
    .get(medicalRatesController.getMedicalRateByPlanId);
  app
    .route("/api/medicalRates/updatemedicalratebyid/:id")
    .put(medicalRatesController.updateMedicalRatesById);
};
