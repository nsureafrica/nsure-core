//@ts-check
const Underwriter = require("../Models/underwriters");

module.exports = {
  getUnderwriter: (req, res) => {
    Underwriter.findAll({
      where: {
        id: req.params.id
      }
    })
      .then(classes => {
        res.send(classes);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  getAllUnderwriter: (req, res) => {
    Underwriter.findAll({})
      .then(classes => {
        res.send(classes);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  createUnderwriter: (req, res) => {
    Underwriter.create(req.body)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
};
