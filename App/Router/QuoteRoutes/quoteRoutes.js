//@ts-check
const QuoteController = require("../../Controllers/quote_controller");

module.exports = app => {

  //Motor Quote
  app.route("/api/quotes/motor/").post(QuoteController.getMotorQuote);

  //Medical Quote
  app.route("/api/quotes/medical").post(QuoteController.getMedicalQuote);

  //last expense quote
  app.route("/api/quotes/lastexpense").post(QuoteController.getLastExpenseQuote);

  app.route("/api/quotes/domestic").post(QuoteController.getDomesticQuote)

  app.route("/api/quotes/businessCombined").post(QuoteController.getBusinessCombinedQuote)

  app.route("/api/quotes/travel").post(QuoteController.getTravelQuote)

  //income protection  Quote
  app.route("/api/quotes/income").post(QuoteController.getIncomeQuote);

  //golf  Quote
  app.route("/api/quotes/golf").post(QuoteController.getGolfQuote);


}