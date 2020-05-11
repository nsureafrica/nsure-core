//@ts-check

const CustomError = require("./../../Utils/ErrorHandler");
const DomesticPolicyBuildingPlansModel = require("./../../Models/domestic_policy_building_plans");
const DomesticPolicyContentPlansModel = require("./../../Models/domestic_policy_content_plans")
module.exports = {
  getQuote: async (req, res) => {
    try {
      const buildingValue = req.body.buildingValue;
      const contentValuePlanId = req.body.contentValuePlanId;
      // const allRisks = req.body.allRisks;
      const numberOfWorkers = req.body.numberOfWorkers;

      //so each underwritter should go through this

      //Calculate Building Value
      var buildingValueAmount = null;

      var buildingPlans = await DomesticPolicyBuildingPlansModel.findAll({
        where: { UnderwriterId: 9 },
      });
      buildingPlans.map(buildingPlan => {
        if (buildingValue > buildingPlan.lower_value && buildingValue < buildingPlan.higher_value) {
          buildingValueAmount = buildingPlan.annual_premium
        }
      })   
            
      //Calculate Content Value

      var contentValueAmount = null;
      var contentValuePlan = await DomesticPolicyContentPlansModel.findOne({where: {id: contentValuePlanId}})
      contentValueAmount = contentValuePlan.annual_premium
      console.log(contentValueAmount)

      // //Calculate All Risks
      // //check for computers and also must be greater than 5000
      // var computerValueAmount = 10000
      // if (computerValueAmount < 5000) {
      //     throw new CustomError("The computer value is too low","400")
      // }
      var allRisksAmount = 10;


      // //Calculate WIBA
      var wibaAmount = numberOfWorkers * 500;

      //quote total
      var quoteAmount = buildingValueAmount + contentValueAmount + allRisksAmount + wibaAmount
      var quoteObject = {
          quoteAmount: quoteAmount,
          buildingValueAmount: buildingValueAmount,
          contentValueAmount: contentValueAmount,
          allRisksAmount: allRisksAmount,
          wibaAmount:wibaAmount
      }

      res.status(200).send(quoteObject);
    } catch (error) {
      console.error(error)
      res.status(500).send(error);
    }
  },
};
