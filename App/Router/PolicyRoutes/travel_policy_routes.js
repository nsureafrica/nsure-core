//@ts-check
const TravelPolicyController = require("../../Controllers/PolicyControllers/travel_policy_controller");
const Storage = require("../../Storage/storage");

module.exports = (app) => {
  app
    .route("/api/policies/travel/getUserPolicies")
    .get(TravelPolicyController.getUserTravelPolicy);
  app
    .route("/api/policies/travel/policy/:policyId")
    .get(TravelPolicyController.getTravelPolicy);
  app.route("/api/policies/travel/createTravelPolicy").post(
    Storage.uploadLogbook.fields([
      { name: "passport", maxCount: 5 },
      { name: "nationalId", maxCount: 5 },
      { name: "kraPin", maxCount: 5 },
    ]),
    TravelPolicyController.createTravelPolicy
  );
  app
    .route("/api/policies/getalltravelpolicies")
    .get(TravelPolicyController.getAllTravelPolicies);

  app
    .route("/api/policies/travel/activateTravelPolicy")
    .put(TravelPolicyController.activateTravelPolicy);

  app
    .route("/api/policies/travel/exportDataAsCsv")
    .get(TravelPolicyController.exportDataAsCsv);
};
