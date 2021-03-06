//@ts-check

const DomesticPolicyBuildingPlansModel = require("../../Models/domestic_policy_building_plans");
const UnderwriterModel = require("../../Models/underwriters");
const SharedControllers = require("../SharedControllers/shared_controllers")
module.exports = {
  createPlan: (req, res) => {
    DomesticPolicyBuildingPlansModel.create(req.body)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  getOnePlan: (req, res) => {
    DomesticPolicyBuildingPlansModel.findOne({
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
    DomesticPolicyBuildingPlansModel.findAll({
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
    SharedControllers.updateEntryById(req,res,DomesticPolicyBuildingPlansModel)
  }
};
