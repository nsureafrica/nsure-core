//@ts-check

const DomesticPolicyController = require('./../../Controllers/DomesticPolicyControllers/domestic_policy_controller')

module.exports = app => {
  app
    .route("/api/policies/domestic/getUserPolicies")
    .get(DomesticPolicyController.getUsersPolicy);
  app
    .route("/api/policies/domestic/getOnePolicy")
    .get(DomesticPolicyController.getOnePolicy);
  app
    .route("/api/policies/domestic/createPolicy")
    .post(DomesticPolicyController.createPolicy);

  app
    .route("/api/policies/domestic/getAllPolicies")
    .get(DomesticPolicyController.getAllPolicies)

  app.route("/api/policies/domestic/activateDomesticPolicy").put(DomesticPolicyController.activatePolicy)

  app.route("/api/policies/domestic/exportDataAsCsv").get(DomesticPolicyController.exportDataAsCsv)
}