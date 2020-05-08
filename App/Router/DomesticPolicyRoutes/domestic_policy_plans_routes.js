//@ts-check

const domesticPolicyBuildingPlansController = require("../../Controllers/DomesticPolicyControllers/domestic_policy_building_plans_controller");
const domesticPolicyContentPlansController = require("./../../Controllers/DomesticPolicyControllers/domestic_policy_content_plans_controller");
module.exports = (app) => {
  app
    .route("/domesticPlans/createDomesticBuildingPlan")
    .post(domesticPolicyBuildingPlansController.createPlan);
  app
    .route("/domesticPlans/getDomesticBuildingPlan/:id")
    .get(domesticPolicyBuildingPlansController.getOnePlan);
  app
    .route("/domesticPlans/getAllDomesticBuildingPlans")
    .get(domesticPolicyBuildingPlansController.getAllPlans);
  app
    .route("/domesticPlans/getDomesticBuildingPlans")
    .get(domesticPolicyBuildingPlansController.getAllPlans);
//   app
//     .route("/plans/domesticPlans/updatemedicalplansbyid/:id")
//     .put(domesticPolicyBuildingPlansController.updatePlanById);

    //domestic content plans
  app
    .route("/domesticPlans/createDomesticContentPlan")
    .post(domesticPolicyContentPlansController.createPlan);
  app
    .route("/domesticPlans/getDomesticContentPlan/:id")
    .get(domesticPolicyContentPlansController.getOnePlan);
  app
    .route("/domesticPlans/getAllDomesticContentPlans")
    .get(domesticPolicyContentPlansController.getAllPlans);
  app
    .route("/domesticPlans/getDomesticContentPlans")
    .get(domesticPolicyContentPlansController.getAllPlans);
//   app
//     .route("/plans/domesticPlans/updatemedicalplansbyid/:id")
//     .put(domesticPolicyContentPlansController.updatePlanById);
};
