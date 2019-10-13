const MotorRates = require("../motor_rates.json");
module.exports = {
  getMotorQuote: (req, res) => {
    console.log(req.body);
    var quoteAmount = 0;
    switch (req.body.category) {
      case "motorcycle":
        req.body.coverType === "comprehensive"
          ? (quoteAmount = MotorRates.motorcycles.comprehensive)
          : req.body.coverType === "thirdParty" &&
            (quoteAmount = MotorRates.motorcycles.thirdParty);
        break;
      case "heavyMachinery":
        req.body.coverType === "comprehensive"
          ? (quoteAmount =
              (MotorRates.heavyMachinery.comprehensive *
                req.body.vehicleEstimatedValue) /
              100)
          : req.body.coverType === "thirdParty" &&
            (quoteAmount = MotorRates.heavyMachinery.thirdParty);
        break;
      case "tankers":
        req.body.coverType === "comprehensive"
          ? (quoteAmount =
              (MotorRates.tankers.comprehensive *
                req.body.vehicleEstimatedValue) /
              100)
          : req.body.coverType === "thirdParty" &&
            (quoteAmount = MotorRates.tankers.thirdParty);
        break;
      case "PMO":
        req.body.coverType === "comprehensive"
          ? (quoteAmount =
              (MotorRates.PMO.comprehensive * req.body.vehicleEstimatedValue) /
              100)
          : req.body.coverType === "thirdParty" &&
            (quoteAmount = MotorRates.PMO.thirdParty);
        break;
      case "specialTypes":
        req.body.coverType === "comprehensive"
          ? (quoteAmount =
              (MotorRates.specialTypes.comprehensive *
                req.body.vehicleEstimatedValue) /
              100)
          : req.body.coverType === "thirdParty" &&
            (quoteAmount = MotorRates.specialTypes.thirdParty);
        break;
      case "drivingSchools":
        req.body.coverType === "comprehensive"
          ? (quoteAmount =
              (MotorRates.drivingSchools.comprehensive *
                req.body.vehicleEstimatedValue) /
              100)
          : req.body.coverType === "thirdParty" &&
            (quoteAmount = MotorRates.drivingSchools.thirdParty);
        break;
      case "PSV":
        req.body.coverType === "comprehensive"
          ? (quoteAmount =
              (MotorRates.PSV.comprehensive * req.body.vehicleEstimatedValue) /
              100)
          : req.body.coverType === "thirdParty" &&
            (quoteAmount = MotorRates.PSV.thirdParty);
        break;
    }
    req.body.vehicleType === "commercial"
      ? req.body.coverType === "comprehensive"
        ? (quoteAmount =
            (MotorRates.motorCommercial.comprehensive *
              req.body.vehicleEstimatedValue) /
            100)
        : req.body.coverType === "thirdParty" &&
          (quoteAmount = MotorRates.motorCommercial.thirdParty)
      : null;
    res.send({ quoteAmount: quoteAmount });
  }
};
