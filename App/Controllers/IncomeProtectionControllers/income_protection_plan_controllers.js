//@ts-check

const IncomeProtectionPlanModel = require("./../../Models/income_protection_plans");
const UnderwriterModel = require("../../Models/underwriters");
const SharedControllers = require("./../SharedControllers/shared_controllers")
module.exports = {
  createPlan: (req, res) => {
    IncomeProtectionPlanModel.create(req.body)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  getOnePlan: (req, res) => {
    IncomeProtectionPlanModel.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(rates => {
        res.send(rates);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  getAllPlans: (req, res) => {
    IncomeProtectionPlanModel.findAll({
      include: [UnderwriterModel]
    })
      .then(rates => {
        res.send(rates);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  updatePlanById: (req,res) => {
    SharedControllers.updateEntryById(req,res,IncomeProtectionPlanModel)
  }
};
