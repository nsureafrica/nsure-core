//@ts-check

const TravelRatesController = require("../../Controllers/TravelPolicyControllers/travel_rates_controller");

module.exports = (app) => {
  app
    .route("/api/travelRates/createTravelRate")
    .post(TravelRatesController.createRate);
  app
    .route("/api/travelRates/getTravelRate/:id")
    .get(TravelRatesController.getOneRate);
  app
    .route("/api/travelRates/getAllTravelRates")
    .get(TravelRatesController.getAllRates);

  //   app
  //     .route("/medicalRates/getMedicalRates")
  //     .get(TravelRatesController.getMedicalRates);
  // app
  //   .route("/travelRates/getAllTravelRatesGroupedByType")
  //   .get(TravelRatesController.getAllRatesGroupedByType);

  //   app
  //     .route("/rates/medicalRates/getmedicalratesbyplanid/:id")
  //     .get(TravelRatesController.getMedicalRateByPlanId);
  //   app
  //     .route("/medicalRates/updatemedicalratebyid/:id")
  //     .put(TravelRatesController.updateMedicalRatesById);
};
