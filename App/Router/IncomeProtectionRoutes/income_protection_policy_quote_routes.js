//@ts-check

const IncomeProtectionQuoteController = require("./../../Controllers/IncomeProtectionControllers/income_protection_quote_controllers")
module.exports = app => {
    app
        .route("/incomeProtectionPolicy/getQuote")
        .get(IncomeProtectionQuoteController.getQuote);
};
