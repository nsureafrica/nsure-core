//@ts-check

const domesticPolicyBuildingPlansController = require("../../Controllers/DomesticPolicyControllers/domestic_policy_building_plans_controller");
const domesticPolicyContentPlansController = require("./../../Controllers/DomesticPolicyControllers/domestic_policy_content_plans_controller");
module.exports = (app) => {
  app
    .route("/api/domesticPlans/createDomesticBuildingPlan")
    .post(domesticPolicyBuildingPlansController.createPlan);
  app
    .route("/api/domesticPlans/getDomesticBuildingPlan/:id")
    .get(domesticPolicyBuildingPlansController.getOnePlan);
  app
    .route("/api/domesticPlans/getAllDomesticBuildingPlans")
    .get(domesticPolicyBuildingPlansController.getAllPlans);
  //   app
  //     .route("/api/plans/domesticPlans/updatemedicalplansbyid/:id")
  //     .put(domesticPolicyBuildingPlansController.updatePlanById);

  //domestic content plans
  app
    .route("/api/domesticPlans/createDomesticContentPlan")
    .post(domesticPolicyContentPlansController.createPlan);
  app
    .route("/api/domesticPlans/getDomesticContentPlan/:id")
    .get(domesticPolicyContentPlansController.getOnePlan);
  app
    .route("/api/domesticPlans/getAllDomesticContentPlans")
    .get(domesticPolicyContentPlansController.getAllPlans);
  app
    .route("/api/domesticPlans/getDomesticContentPlans")
    .get(domesticPolicyContentPlansController.getAllPlans);
  //   app
  //     .route("/api/plans/domesticPlans/updatemedicalplansbyid/:id")
  //     .put(domesticPolicyContentPlansController.updatePlanById);
};
