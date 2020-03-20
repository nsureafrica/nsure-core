//@ts-check

const MedicalRates = require("../../Models/medical_rates");
const SharedRateControllers = require("./shared_rate_controllers")
const SharedControllers = require("./../SharedControllers/shared_controllers")
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

  getAllMedicalRatesGroupedByUnderwriters: (req, res) => {
    SharedRateControllers.getGroupedByFieldRates(req, res, "UnderwriterId",MedicalRates);
  },
  getAllMedicalRates: (req, res) => {
    MedicalRates.findAll()
      .then(rates => {
        res.send(rates);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  updateMedicalRatesById: (req,res) => {
    SharedControllers.updateEntryById(req,res,MedicalRates)
  },
  getMedicalRateByPlanId: (req,res) => {
    SharedRateControllers.getRateByPlanId(req,res,MedicalRates)
  },
};
