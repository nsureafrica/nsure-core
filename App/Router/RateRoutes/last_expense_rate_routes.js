//@ts-check

const lastexpenseratecontroller = require("./../../Controllers/RateControllers/last_expense_rate_controller")

module.exports = app => {
    app
    .route("/medicalRates/createMedicalRate")
    .post(lastexpenseratecontroller.createLastExpenseRate);
}