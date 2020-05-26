//@ts-check

const TransactionsController = require("./../../Controllers/TransactionControllers/Transaction_Controller")

module.exports = app => {
   app.route("/transactions/createTransactions").post(TransactionsController.createNewTransaction)

   app.route("/transactions/getalltransactions").get(TransactionsController.getAllTransactions)

   app.route("/transactions/getusertransactions/:userid").get(TransactionsController.getUserTransactions)

   app.route("/transactions/confirmtransaction").post(TransactionsController.confirmTransaction)

   app.route("/transactions/gettransactionbytransactionref").get(TransactionsController.getTransactionByTransactionRef)

   app.route("/transactions/confirmSuccessfulIpayTransaction").get(TransactionsController.confirmSuccessfulTransaction);

   app.route("/transactions/confirmUnsuccessfulIpayTransaction").get(TransactionsController.confirmUnsuccessfulTransaction);

}