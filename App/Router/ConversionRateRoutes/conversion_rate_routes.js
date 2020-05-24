//@ts-check

const ConversionRateController = require("./../../Controllers/ConversionRateControllers/conversion_rate_controller")

module.exports = (app) => {
    app
    .route("/conversionRates/createConversionRate")
    .post(ConversionRateController.create);
}