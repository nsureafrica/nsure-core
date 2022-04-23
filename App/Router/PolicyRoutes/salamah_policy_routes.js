//@ts-check
const SalamahTransitionController = require("../../Controllers/PolicyControllers/salamah_policy_controller");

module.exports = (app) => {
  app
    .route("/api/policies/salamahTransition/:userId")
    .get(SalamahTransitionController.getUserSalamahTransitionPolicies);

  app
    .route("/api/policies/salamahTransition/policy/:policyId")
    .get(SalamahTransitionController.getSalamahTransitionPolicy);

  app
    .route("/api/policies/salamahTransition/policy")
    .post(SalamahTransitionController.createSalamahTransitionPolicy);
  app
    .route("/api/policies/getallsalamahpolicies")
    .get(SalamahTransitionController.getAllSalamahPolices);
};
