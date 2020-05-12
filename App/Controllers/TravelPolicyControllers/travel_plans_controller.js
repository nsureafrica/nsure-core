//@ts-check
const UnderwriterModel = require("../../Models/underwriters");
const SharedControllers = require("./../SharedControllers/shared_controllers");
const TravelPolicyPlansModel = require("./../../Models/travel_policy_plans");
const SharedRateControllers = require("./../RateControllers/shared_rate_controllers");

module.exports = {
  createPlan: (req, res) => {
    TravelPolicyPlansModel.create(req.body)
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  getOnePlan: (req, res) => {
    TravelPolicyPlansModel.findAll({
      where: {
        id: req.params.id,
      },
    })
      .then((rates) => {
        res.send(rates);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  getPlans: (req, res) => {
    TravelPolicyPlansModel.findAll({
      where: {
        userId: req.user.id,
      },
    })
      .then((rates) => {
        res.send(rates);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  getAllPlans: (req, res) => {
    TravelPolicyPlansModel.findAll({
      include: [UnderwriterModel],
    })
      .then((rates) => {
        res.send(rates);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  updatePlanById: (req, res) => {
    SharedControllers.updateEntryById(req, res, TravelPolicyPlansModel);
  },
  getAllGroupedByType: (req, res) => {
    SharedRateControllers.getGroupedByFieldRates(req, res, "type",TravelPolicyPlansModel);
  },
};
