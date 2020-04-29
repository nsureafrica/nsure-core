//@ts-check
const TravelPolicyController = require("../../Controllers/PolicyControllers/travel_policy_controller");
const Storage = require("../../Storage/storage");

module.exports = (app) => {
  app
    .route("/policies/travel/getUserPolicies")
    .get(TravelPolicyController.getUserTravelPolicy);
  app
    .route("/policies/travel/policy/:policyId")
    .get(TravelPolicyController.getTravelPolicy);
  app.route("/policies/travel/policy").post(
    Storage.uploadLogbook.fields([
      { name: "passport", maxCount: 5 },
      { name: "nationalId", maxCount: 5 },
      { name: "kraPin", maxCount: 5 },
    ]),
    TravelPolicyController.createTravelPolicy
  );
  app
    .route("/policies/getalltravelpolicies")
    .get(TravelPolicyController.getAllTravelPolicies);

  app
    .route("/policies/travel/activateTravelPolicy")
    .put(TravelPolicyController.activateTravelPolicy);

  app
    .route("/policies/travel/exportDataAsCsv")
    .get(TravelPolicyController.exportDataAsCsv);
};
