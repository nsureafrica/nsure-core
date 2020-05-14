//@ts-check
const QuoteController = require("../../Controllers/quote_controller");

module.exports = app => {

    //Motor Quote
    app.route("/quotes/motor/").post(QuoteController.getMotorQuote);

    //Medical Quote
    app.route("/quotes/medical").post(QuoteController.getMedicalQuote);

    //last expense quote
    app.route("/quotes/lastexpense").post(QuoteController.getLastExpenseQuote);

    app.route("/quotes/domestic").post(QuoteController.getDomesticQuote)

    app.route("/quotes/businessCombined").post(QuoteController.getBusinessCombinedQuote)
}