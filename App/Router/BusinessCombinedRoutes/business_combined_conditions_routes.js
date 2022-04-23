//@ts-check

const BusinessCombinedConditionsRoutes = require("../../Controllers/BusinessCombinedControllers/business_combined_conditions_controller");

module.exports = (app) => {
  app
    .route("/api/businessCombinedConditions/create")
    .post(BusinessCombinedConditionsRoutes.createCondition);
  app
    .route("/api/businessCombinedConditions/getCondition/:id")
    .get(BusinessCombinedConditionsRoutes.getOneCondition);
  app
    .route("/api/businessCombinedConditions/getAllConditions")
    .get(BusinessCombinedConditionsRoutes.getAllConditions);
  app
    .route("/api/businessCombinedConditions/getAllCondtionsGroupedByClass")
    .get(BusinessCombinedConditionsRoutes.getAllConditionsGroupedByType);

  app
    .route("/api/businessCombinedConditions/getAllConditionsByClassId/:id")
    .get(BusinessCombinedConditionsRoutes.getConditionByClassId);
};
