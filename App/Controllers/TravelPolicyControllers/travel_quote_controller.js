//@ts-check

//wintersports
//age
const TravelPolicyRatesModel = require("./../../Models/travel_policy_rates");
const TravelPolicyPlansModel = require("./../../Models/travel_policy_plans");
const axios = require("axios");
const { Op } = require('sequelize')

module.exports = {
  getQuote: async (req, res) => {
    try {
      const TravelPolicyPlanId = req.body.travelPolicyPlanId;
      const winterSports = false;

      //calculate age
      const age =
        // @ts-ignore
        new Date(new Date() - new Date(req.body.dateOfBirth)).getFullYear() -
        1970;

      const TravelPolicy = await TravelPolicyPlansModel.findOne({
        where: { id: TravelPolicyPlanId },
      });
      // check max age
      if (age > TravelPolicy.maxAge || age < TravelPolicy.minAge) {
        throw new Error("too old mate");
      }
      const Rates = await TravelPolicyRatesModel.findAll({
        where: { TravelPolicyPlanId: TravelPolicyPlanId,numberOfDays:{
          [Op.gte]: req.body.numberOfDays
        }},
      });

      if (Rates.length < 1) {
        throw new Error("No available rates")
      }

      function getRate() {
        return Rates.reduce((min, p) => p.amount < min ? p.amount : min, Rates[0]);
      }
      const Rate = getRate()
      console.log(Rate)
      var convertedAmount = null;
      var conversionRate = 1;
      if (Rate.currency != "KES") {
        conversionRate = 102.12;
        convertedAmount = Rate.amount * conversionRate;
      } else {
        conversionRate = 1;
        convertedAmount = Rate.amount * conversionRate;
      }
      var schengenCountriesAmount = 0;
      //first check if the rate has shengen countries supported if they do then :
      if (TravelPolicy.schengenCountries) {
        const schengenCountries = [
          "AUT",
          "BEL",
          "CZE",
          "DNK",
          "EST",
          "FIN",
          "FRA",
          "DEU",
          "GRC",
          "HUN",
          "ISL",
          "ITA",
          "LVA",
          "LIE",
          "LTU",
          "LUX",
          "MLT",
          "NLD",
          "NOR",
          "POL",
          "PRT",
          "SVK",
          "SVN",
          "ESP",
          "SWE",
          "CHE",
        ];
        if (schengenCountries.includes(req.body.country)) {
          //get total and sum it up
          schengenCountriesAmount =
            Rate.amount * (TravelPolicy.schengenCountriesRate/100);
        }
      }

      var winterSportsAmount = 0;
      //check whether the rate supports winter sports and at what rate
      if (req.body.winterSports && TravelPolicy.winterSports) {
        winterSportsAmount = Rate.amount * (TravelPolicy.winterSportsRate/100);
      }
      var quoteAmount =
        Rate.amount + schengenCountriesAmount + winterSportsAmount;

      var QuoteObject = {
        quoteAmount: quoteAmount,
        numberOfDays: Rate.numberOfDays,
        amount: Rate.amount,
        schengenCountriesAmount: schengenCountriesAmount,
        winterSportsAmount: winterSportsAmount,
        convertedAmount: convertedAmount,
        conversionRate: conversionRate,
        currency: Rate.currency,
        TravelPolicyPlanId: Rate.TravelPolicyPlanId,
      };
      res.status(200).send(QuoteObject);
      //get rates and loop to find appropriate
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
