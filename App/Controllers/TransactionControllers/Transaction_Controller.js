//@ts-check

const { sequelizeConnection } = require("../../DB/database");
const { QueryTypes } = require("sequelize");

const TransactionModel = require("./../../Models/Transaction");
const BillModel = require("./../../Models/Bill");
module.exports = {
  createNewTransaction: (req, res) => {
    const userId = { UserId: req.user.id };
    Object.assign(req.body, userId);

    TransactionModel.create(req.body)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(error => {
        res.status(500).send(error);
      });
  },
  getAllTransactions: (req, res) => {
    TransactionModel.findAll()
      .then(response => {
        res.status(200).send(response);
      })
      .catch(error => {
        res.status(500).send(error);
      });
  },
  getUserTransactions: (req, res) => {
    TransactionModel.findAll()
      .then(response => {
        res.status(200).send(response);
      })
      .catch(error => {
        res.send(error);
      });
  },
  getTransactionByTransactionRef: (req, res) => {
    TransactionModel.findAll({
      where: { transactionRef: req.params.transactionRef }
    })
      .then(response => {
        res.send(response);
      })
      .catch(err => res.send(err));
  },
  confirmTransaction: (req, res) => {
    //only admins are able to conf
    if (!(req.user.UserCategoryId === 2)) {
      res
        .status(401)
        .send({
          message: "You need to be an administrator to confirm transactions"
        });
    } else {
      const verifiedById = { verifiedById: req.user.id };
      Object.assign(req.body, verifiedById);
      TransactionModel.update(req.body, { where: { id: req.body.id } })
        .then(async response => {
          //get the first transaction so as to get the details
          var FirstTransaction = await TransactionModel.findOne({
            where: { id: req.body.id }
          });
          //use the transaction to get both the bill and all the transactions for the bill
          var Bill = await BillModel.findOne({
            where: { id: FirstTransaction.BillId }
          });
          var AllBillTransactions = await TransactionModel.findAll({
            where: { BillId: Bill.id, verified: true }
          });

          var totalAmountPaid = AllBillTransactions.reduce(function(
            amount,
            transaction
          ) {
            return amount + transaction.amount;
          },
          0);

          //check if the total amount paid is greater than the amount on the bill
          if (totalAmountPaid >= Bill.amount) {
            //if it is update the bill to paid and send that the bill is fully paid
            await BillModel.update(
              { paid: true, amountPaid: totalAmountPaid },
              { where: { id: Bill.id } }
            )
              .then(() => {
                if (totalAmountPaid === Bill.amount) {
                  res.send({
                    statusCode: 0,
                    message: "bill is fully paid",
                    amount: Bill.amount
                  });
                }
                if (totalAmountPaid > Bill.amount) {
                  res.send({
                    statusCode: 1,
                    message: "The Bill has been overpaid",
                    amount: Bill.amount,
                    refund: totalAmountPaid - Bill.amount
                  });
                }
              })
              .catch(err => {
                throw err;
              });
          } else {
            //if not give the front end the remainder
            res.send({
              statusCode: 2,
              message: "The Bill has not been fully paid",
              amount: Bill.amount,
              remainder: Bill.amount - totalAmountPaid
            });
          }
        })
        .catch(err => res.status(500).send(err));
    }
  }
};
