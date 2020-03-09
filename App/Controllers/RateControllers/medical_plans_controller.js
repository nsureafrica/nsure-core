//@ts-check

const MedicalPlans = require('../../Models/medical_plans')
const UnderwriterModel = require("../../Models/underwriters");

module.exports = {
    createMedicalPlan: (req, res) => {
        MedicalPlans.create(req.body)
          .then(response => {
            res.send(response);
          })
          .catch(err => {
            res.status(500).send(err);
          });
      },

      getOneMedicalPlan: (req, res) => {
        MedicalPlans.findAll({
          where: {
            userId: req.params.userId
          }
        })
          .then(rates => {
            res.send(rates);
          })
          .catch(err => {
            res.status(500).send(err);
          });
      },
      getMedicalPlans: (req, res) => {
        MedicalPlans.findAll({
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
      getAllMedicalPlans: (req, res) => {
        MedicalPlans.findAll({
          include: [UnderwriterModel],
        })
          .then(rates => {
            res.send(rates);
          })
          .catch(err => {
            res.status(500).send(err);
          });
      }
}