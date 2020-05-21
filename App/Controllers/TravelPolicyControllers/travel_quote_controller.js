//@ts-check

//wintersports
//age
const TravelPolicyRates = require("./../../Models/travel_policy_rates")
module.exports = {
  getQuote: async (req, res) => {
    try {
      const TravelPolicyPlanId = req.body.TravelPolicyPlanId
      const winterSports = false;
      const age = 17;
      const schengenCountries = ["AUT","BEL","CZE","DNK","EST","FIN","FRA","DEU","GRC","HUN","ISL","ITA","LVA","LIE","LTU","LUX","MLT","NLD","NOR","POL","PRT","SVK","SVN","ESP","SWE","CHE"]

      // check max age 
      if (age > 85) {
          throw new Error("too old mate")
      }

      const Rate = await TravelPolicyRates.findOne({where:{"TravelPolicyPlanId":TravelPolicyPlanId,"numberOfDays":8}})
      

      var QuoteObject = {
        "numberOfDays": Rate.numberOfDays,
        "amount": Rate.amount,
        "convertedAmount":12343,
        "conversionRate":102.12,
        "currency": Rate.currency,
        "TravelPolicyPlanId": Rate.TravelPolicyPlanId
    }
    res.status(200).send(QuoteObject)
      //get rates and loop to find appropriate
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
