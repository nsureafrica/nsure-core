//@ts-check
const QuoteController = require("../../Controllers/quote_controller");

module.exports = app => {

    //Motor Quote
    app.route("/quotes/motor/").post(QuoteController.getMotorQuote);

    //Medical Quote
    app.route("/quotes/medical").post(QuoteController.getMedicalQuote);
}