//@ts-check

const BusinessCombinedClassesController = require("../../Controllers/BusinessCombinedControllers/business_combined_classes_controller");

module.exports = (app) => {
  app
    .route("/api/businessCombinedClasses/create")
    .post(BusinessCombinedClassesController.createClass);
  app
    .route("/api/businessCombinedClasses/getClass/:id")
    .get(BusinessCombinedClassesController.getOneClass);
  app
    .route("/api/businessCombinedClasses/getAllClasses")
    .get(BusinessCombinedClassesController.getAllClasses);
};
