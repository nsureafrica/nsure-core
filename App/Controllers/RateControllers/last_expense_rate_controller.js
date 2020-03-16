//@ts-check

const LastExpenseRateModel = require("./../../Models/last_expense_rates");

module.exports = {
  createLastExpenseRate: (req, res) => {
    LastExpenseRateModel.create(req.body)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  getOneLastExpenseRate: (req, res) => {
    LastExpenseRateModel.findAll({
      where: {
        userId: req.user.id
      }
    })
      .then(rates => {
        res.send(rates);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  getLastExpenseRates: (req, res) => {
    LastExpenseRateModel.findAll({
      where: {
        userId: req.user.id
      }
    })
      .then(rates => {
        res.send(rates);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  getAllLastExpenseRates: (req, res) => {
    LastExpenseRateModel.findAll()
      .then(rates => {
        res.send(rates);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
};
