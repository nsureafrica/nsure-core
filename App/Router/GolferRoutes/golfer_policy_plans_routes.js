//@ts-check

const GolferPlanController = require("../../Controllers/GolferControllers/golfer_plan_controllers");

module.exports = app => {
    app
        .route("/api/golferPlans/createPlan")
        .post(GolferPlanController.createPlan);

    app
        .route("/api/golferPlans/getPlan/:id")
        .get(GolferPlanController.getOnePlan);
    app
        .route("/api/golferPlans/getPlans")
        .get(GolferPlanController.getAllPlans);
    app
        .route("/api/plans/golferPlans/updateById/:id")
        .put(GolferPlanController.updatePlanById);
};
