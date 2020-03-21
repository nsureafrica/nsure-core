//@ts-check

const TransactionModel = require("./../../Models/Transaction");

module.exports = {
  createNewTransaction: (req, res) => {
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
