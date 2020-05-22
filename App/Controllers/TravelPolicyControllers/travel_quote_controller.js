//@ts-check

//wintersports
//age
const TravelPolicyRates = require("./../../Models/travel_policy_rates")
const axios = require("axios")
module.exports = {
  getQuote: async (req, res) => {
    try {
      const TravelPolicyPlanId = req.body.travelPolicyPlanId
      const winterSports = false;
      const age = 17;
      const schengenCountries = ["AUT","BEL","CZE","DNK","EST","FIN","FRA","DEU","GRC","HUN","ISL","ITA","LVA","LIE","LTU","LUX","MLT","NLD","NOR","POL","PRT","SVK","SVN","ESP","SWE","CHE"]

      // check max age 
      if (age > 85) {
          throw new Error("too old mate")
      }

      const Rate = await TravelPolicyRates.findOne({where:{"TravelPolicyPlanId":TravelPolicyPlanId,"numberOfDays":8}})
    
      var convertedAmount = null
      var conversionRate = null
      if (Rate.currency != "KES") {
        conversionRate = 102.12
        convertedAmount = Rate.amount * conversionRate
      }else{
        conversionRate = 1
        convertedAmount = Rate.amount * conversionRate
      }
      var schengenCountriesAmount = 0
      var winterSportsAmount = 0
      var quoteAmount = Rate.amount + schengenCountriesAmount + winterSportsAmount

      var QuoteObject = {
        "quoteAmount": quoteAmount,
        "numberOfDays": Rate.numberOfDays,
        "amount": Rate.amount,
        "schengenCountriesAmount":schengenCountriesAmount,
        "winterSportsAmount":winterSportsAmount,
        "convertedAmount":convertedAmount,
        "conversionRate":conversionRate,
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
