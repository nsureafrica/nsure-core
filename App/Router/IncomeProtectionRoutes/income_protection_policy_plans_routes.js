//@ts-check

const IncomeProtectionPlanController = require("../../Controllers/IncomeProtectionControllers/income_protection_plan_controllers");

module.exports = app => {
    app
        .route("/api/incomeProtectionPlan/createPlan")
        .post(IncomeProtectionPlanController.createPlan);

    app
        .route("/api/incomeProtectionPlan/getPlan/:id")
        .get(IncomeProtectionPlanController.getOnePlan);
    app
        .route("/api/incomeProtectionPlan/getPlans")
        .get(IncomeProtectionPlanController.getAllPlans);
    app
        .route("/api/plans/incomeProtectionPlan/updateById/:id")
        .put(IncomeProtectionPlanController.updatePlanById);
};
