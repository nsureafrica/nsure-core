//@ts-check

const BusinessCombinedConditionsRoutes = require("../../Controllers/BusinessCombinedControllers/business_combined_conditions_controller");

module.exports = (app) => {
  app
    .route("/businessCombinedConditions/create")
    .post(BusinessCombinedConditionsRoutes.createCondition);
  app
    .route("/businessCombinedConditions/getCondition/:id")
    .get(BusinessCombinedConditionsRoutes.getOneCondition);
  app
    .route("/businessCombinedConditions/getAllConditions")
    .get(BusinessCombinedConditionsRoutes.getAllConditions);
  app
    .route("/businessCombinedConditions/getAllCondtionsGroupedByClass")
    .get(BusinessCombinedConditionsRoutes.getAllConditionsGroupedByType);

  app
    .route("/businessCombinedConditions/getAllConditionsByClassId/:id")
    .get(BusinessCombinedConditionsRoutes.getConditionByClassId);
};
