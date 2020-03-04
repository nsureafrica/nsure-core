//@ts-check
const SalamahTransitionController = require("../../Controllers/PolicyControllers/salamah_policy_controller");

module.exports = app => {
    app
    .route("/policies/salamahTransition/:userId")
    .get(SalamahTransitionController.getUserSalamahTransitionPolicies);

  app
    .route("/policies/salamahTransition/policy/:policyId")
    .get(SalamahTransitionController.getSalamahTransitionPolicy);

  app
    .route("/policies/salamahTransition/policy")
    .post(SalamahTransitionController.createSalamahTransitionPolicy);
  app.route("/policies/getallsalamahpolicies").get(SalamahTransitionController.getAllSalamahPolices)
}