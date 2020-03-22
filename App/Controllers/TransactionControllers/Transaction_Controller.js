//@ts-check

const TransactionModel = require("./../../Models/Transaction");
const UserModel = require("./../../Models/User")
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
  confirmTransaction: (req, res) => {

    //confirm the transaction
    //send the mail
    //update the bill
    if (!(req.user.UserCategoryId === 2)) {
      res.status(401).send();
    } else {
      const verifiedById = { verifiedById: req.user.id };
      Object.assign(req.body, verifiedById);
      TransactionModel.update(req.body, { where: { id: req.body.id } })
        .then(response => {
          console.log(response);
          res.send(response);
        })
        .catch(err => res.status(500).send(err));
    }
  }
};
