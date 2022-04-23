//@ts-check

const TransactionsController = require("./../../Controllers/TransactionControllers/Transaction_Controller")

module.exports = app => {
   app.route("/api/transactions/createTransactions").post(TransactionsController.createNewTransaction)

   app.route("/api/transactions/getalltransactions").get(TransactionsController.getAllTransactions)

   app.route("/api/transactions/getusertransactions/:userid").get(TransactionsController.getUserTransactions)

   app.route("/api/transactions/confirmtransaction").post(TransactionsController.confirmTransaction)

   app.route("/api/transactions/gettransactionbytransactionref").get(TransactionsController.getTransactionByTransactionRef)

   app.route("/api/transactions/confirmSuccessfulIpayTransaction").get(TransactionsController.confirmSuccessfulTransaction);

   app.route("/api/transactions/confirmUnsuccessfulIpayTransaction").get(TransactionsController.confirmUnsuccessfulTransaction);

}