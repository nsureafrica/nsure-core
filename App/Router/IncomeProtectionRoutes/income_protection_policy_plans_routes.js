//@ts-check

const IncomeProtectionPlanController = require("../../Controllers/IncomeProtectionControllers/income_protection_plan_controllers");

module.exports = app => {
    app
        .route("/incomeProtectionPlan/createPlan")
        .post(IncomeProtectionPlanController.createPlan);

    app
        .route("/incomeProtectionPlan/getPlan/:id")
        .get(IncomeProtectionPlanController.getOnePlan);
    app
        .route("/incomeProtectionPlan/getPlans")
        .get(IncomeProtectionPlanController.getAllPlans);
    app
        .route("/plans/incomeProtectionPlan/updateById/:id")
        .put(IncomeProtectionPlanController.updatePlanById);
};
