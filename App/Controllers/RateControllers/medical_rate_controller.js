//@ts-check

const MedicalRates = require("../../Models/medical_rates");
//create rate
//get all rates
//get one rate
module.exports = {
  //Create a motor rate
  createMedicalRate: (req, res) => {
    MedicalRates.create(req.body)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  getOneMedicalRate: (req, res) => {
    MedicalRates.findAll({
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
  getMedicalRates: (req, res) => {
    MedicalRates.findAll({
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
  getAllMedicalRates: (req, res) => {
    MedicalRates.findAll()
      .then(rates => {
        res.send(rates);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
};
