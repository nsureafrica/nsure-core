//@ts-check

const BillController = require("../../Controllers/TransactionControllers/Bill_Controller");

module.exports = app => {
    app.route("/bill/getbill/:id").get(BillController.getTransctionsViaBillId)

}