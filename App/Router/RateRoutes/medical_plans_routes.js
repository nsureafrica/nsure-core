//@ts-check

const medicalPlansController = require("../../Controllers/medical_plans_controller")

module.exports = app => {
    app
    .route("/medicalPlans/createMedicalPlan")
    .post(medicalPlansController.createMedicalPlan);
  app
    .route("/medicalPlans/getMedicalPlan/:id")
    .get(medicalPlansController.getOneMedicalPlan);
  app
    .route("/medicalPlans/getAllMedicalPlans")
    .get(medicalPlansController.getAllMedicalPlans);
  app
    .route("/medicalPlans/getMedicalPlans")
    .get(medicalPlansController.getMedicalPlans);
}