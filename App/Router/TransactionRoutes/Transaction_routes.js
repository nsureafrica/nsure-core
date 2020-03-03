//@ts-check

const TransactionsController = require("./../../Controllers/TransactionControllers/Transaction_Controller")

module.exports = app => {
   app.route("/transactions/createTransactions").post(TransactionsController.createNewTransaction)
}