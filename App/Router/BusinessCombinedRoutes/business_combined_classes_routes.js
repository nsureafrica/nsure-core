//@ts-check

const BusinessCombinedClassesController = require("../../Controllers/BusinessCombinedControllers/business_combined_classes_controller");

module.exports = (app) => {
  app
    .route("/businessCombinedClasses/create")
    .post(BusinessCombinedClassesController.createClass);
  app
    .route("/businessCombinedClasses/getClass/:id")
    .get(BusinessCombinedClassesController.getOneClass);
  app
    .route("/businessCombinedClasses/getAllClasses")
    .get(BusinessCombinedClassesController.getAllClasses);
};
