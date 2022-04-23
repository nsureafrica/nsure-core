//@ts-check

const medicalPlansController = require("../../Controllers/PlanControllers/medical_plans_controller");

module.exports = app => {
  app
    .route("/api/medicalPlans/createMedicalPlan")
    .post(medicalPlansController.createMedicalPlan);
  app
    .route("/api/medicalPlans/getMedicalPlan/:id")
    .get(medicalPlansController.getOneMedicalPlan);
  app
    .route("/api/medicalPlans/getAllMedicalPlans")
    .get(medicalPlansController.getAllMedicalPlans);
  app
    .route("/api/medicalPlans/getMedicalPlans")
    .get(medicalPlansController.getMedicalPlans);
  app
    .route("/api/plans/medicalPlans/updatemedicalplansbyid/:id")
    .put(medicalPlansController.updateMedicalPlanById);
};
