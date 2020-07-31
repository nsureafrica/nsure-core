//@ts-check

const GolferPlanController = require("../../Controllers/GolferControllers/golfer_plan_controllers");

module.exports = app => {
    app
        .route("/golferPlans/createPlan")
        .post(GolferPlanController.createPlan);

    app
        .route("/golferPlans/getPlan/:id")
        .get(GolferPlanController.getOnePlan);
    app
        .route("/golferPlans/getPlans")
        .get(GolferPlanController.getAllPlans);
    app
        .route("/plans/golferPlans/updateById/:id")
        .put(GolferPlanController.updatePlanById);
};
