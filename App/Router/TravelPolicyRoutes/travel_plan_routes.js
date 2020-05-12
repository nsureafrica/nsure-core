//@ts-check

const TravelPlanController = require("./../../Controllers/TravelPolicyControllers/travel_plans_controller")

module.exports = app => {
    app
    .route("/travelPlans/createTravelPlan")
    .post(TravelPlanController.createPlan);
  app
    .route("/travelPlans/getTravelPlan/:id")
    .get(TravelPlanController.getOnePlan);
  app
    .route("/travelPlans/getAllgetTravelPlans")
    .get(TravelPlanController.getAllPlans);
  app
    .route("/travelPlans/getTravelPlans")
    .get(TravelPlanController.getAllPlans);
  app
  .route("/travelRates/getAllTravelPlansGroupedByType")
  .get(TravelPlanController.getAllGroupedByType);
  // app
    // .route("/plans/domesticPlans/updatemedicalplansbyid/:id")
    // .put(TravelPlanController.updatePlanById);
}
