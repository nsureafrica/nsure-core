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
            (quoteAmount =
              (MotorRates.heavyMachinery.thirdParty *
                req.body.vehicleEstimatedValue) /
              100);
        break;
      case "tankers":
        req.body.coverType === "comprehensive"
          ? (quoteAmount =
              (MotorRates.tankers.comprehensive *
                req.body.vehicleEstimatedValue) /
              100)
          : req.body.coverType === "thirdParty" &&
            (quoteAmount =
              (MotorRates.tankers.thirdParty * req.body.vehicleEstimatedValue) /
              100);
        break;
      case "PMO":
        req.body.coverType === "comprehensive"
          ? (quoteAmount =
              (MotorRates.PMO.comprehensive * req.body.vehicleEstimatedValue) /
              100)
          : req.body.coverType === "thirdParty" &&
            (quoteAmount =
              (MotorRates.PMO.thirdParty * req.body.vehicleEstimatedValue) /
              100);
        break;
      case "specialTypes":
        req.body.coverType === "comprehensive"
          ? (quoteAmount =
              (MotorRates.specialTypes.comprehensive *
                req.body.vehicleEstimatedValue) /
              100)
          : req.body.coverType === "thirdParty" &&
            (quoteAmount =
              (MotorRates.specialTypes.thirdParty *
                req.body.vehicleEstimatedValue) /
              100);
        break;
      case "drivingSchools":
        req.body.coverType === "comprehensive"
          ? (quoteAmount =
              (MotorRates.drivingSchools.comprehensive *
                req.body.vehicleEstimatedValue) /
              100)
          : req.body.coverType === "thirdParty" &&
            (quoteAmount =
              (MotorRates.drivingSchools.thirdParty *
                req.body.vehicleEstimatedValue) /
              100);
        break;
      case "PSV":
        req.body.coverType === "comprehensive"
          ? (quoteAmount =
              (MotorRates.PSV.comprehensive * req.body.vehicleEstimatedValue) /
              100)
          : req.body.coverType === "thirdParty" &&
            (quoteAmount =
              (MotorRates.PSV.thirdParty * req.body.vehicleEstimatedValue) /
              100);
        break;
    }
    req.body.vehicleType === "commercial"
      ? req.body.coverType === "comprehensive"
        ? (quoteAmount =
            (MotorRates.motorCommercial.comprehensive *
              req.body.vehicleEstimatedValue) /
            100)
        : req.body.coverType === "thirdParty" &&
          (quoteAmount =
            (MotorRates.motorCommercial.thirdParty *
              req.body.vehicleEstimatedValue) /
            100)
      : null;
    res.send({ quoteAmount: quoteAmount });
  }
};
