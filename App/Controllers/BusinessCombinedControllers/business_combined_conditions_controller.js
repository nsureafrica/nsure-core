//@ts-check

const BusinessCombinedConditionsModel = require("./../../Models/business_combined_conditions");
const SharedControllers = require("./../SharedControllers/shared_controllers");
const SharedRateControllers = require("./../RateControllers/shared_rate_controllers");
module.exports = {
  createCondition: (req, res) => {
    BusinessCombinedConditionsModel.create(req.body)
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  getOneCondition: (req, res) => {
    BusinessCombinedConditionsModel.findAll({
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
  getAllConditions: (req, res) => {
    BusinessCombinedConditionsModel.findAll()
      .then((rates) => {
        res.send(rates);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  updateConditionById: (req, res) => {
    SharedControllers.updateEntryById(
      req,
      res,
      BusinessCombinedConditionsModel
    );
  },
  getConditionByClassId: (req, res) => {
    BusinessCombinedConditionsModel.findAll({
      where: {
        BusinessCombinedClassId: req.params.id,
      },
    })
      .then((rates) => {
        res.send(rates);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  getAllConditionsGroupedByType: (req, res) => {
    SharedRateControllers.getGroupedByFieldRates(
      req,
      res,
      "BusinessCombinedClassId",
      BusinessCombinedConditionsModel
    );
  },
};
