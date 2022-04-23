//@ts-check

const TravelPlanController = require("./../../Controllers/TravelPolicyControllers/travel_plans_controller")

module.exports = app => {
  app
    .route("/api/travelPlans/createTravelPlan")
    .post(TravelPlanController.createPlan);
  app
    .route("/api/travelPlans/getTravelPlan/:id")
    .get(TravelPlanController.getOnePlan);
  app
    .route("/api/travelPlans/getAllgetTravelPlans")
    .get(TravelPlanController.getAllPlans);
  app
    .route("/api/travelPlans/getTravelPlans")
    .get(TravelPlanController.getAllPlans);
  app
    .route("/api/travelRates/getAllTravelPlansGroupedByType")
    .get(TravelPlanController.getAllGroupedByType);
  // app
  // .route("/plans/domesticPlans/updatemedicalplansbyid/:id")
  // .put(TravelPlanController.updatePlanById);
}
