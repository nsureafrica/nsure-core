//@ts-check

const TransactionModel = require("./../../Models/Transaction");

module.exports = {
  createNewTransaction: (req, res) => {
    TransactionModel.create(req.body).then(response => {
      res.status(200).send(response);
    }).catch(error => {
        res.status(500).send(error)
    })
  },
  getAllTransactions: (req,res) => {
    TransactionModel.findAll().then(response =>{
      res.status(200).send(response)
    }).catch(error => {
      res.status(500).send(error)
    })
  }
};
