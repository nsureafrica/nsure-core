//@ts-check
const TravelPolicyController = require("../../Controllers/PolicyControllers/travel_policy_controller");

module.exports = app => {
    app
    .route("/policies/travel/:userId")
    .get(TravelPolicyController.getUserTravelPolicy);
  app
    .route("/policies/travel/policy/:policyId")
    .get(TravelPolicyController.getTravelPolicy);
  app
    .route("/policies/travel/policy")
    .post(TravelPolicyController.createTravelPolicy);
}