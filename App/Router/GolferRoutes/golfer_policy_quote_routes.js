//@ts-check

const GolferQuoteController = require("./../../Controllers/GolferControllers/golfer_quote_controllers")
module.exports = app => {
    app
        .route("/golferPolicy/getQuote")
        .get(GolferQuoteController.getGolfersQuote);
};
