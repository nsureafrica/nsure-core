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
};
