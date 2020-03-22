//@ts-check

const BillModel = require("../../Models/Bill");
const TransactionModel = require("../../Models/Transaction");
module.exports = {
  getTransctionsViaBillId: (req, res) => {
    BillModel.findOne({
      include: [TransactionModel],

      where: {
        id: req.params.id
      }
    })
      .then(response => {
        var transactionTotal = response.Transactions.reduce(function(
          prev,
          cur
        ) {
          return prev + cur.dataValues.amount;
        },
        0);
        const totalTransactions = { totalAmountPaid: transactionTotal };
        Object.assign(response.dataValues, totalTransactions);
        res.status(200).send(response);
      })
      .catch(error => {
        res.status(500).send(error);
      });
  },
};
