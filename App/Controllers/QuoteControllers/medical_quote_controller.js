//@ts-check

//@ts-ignore
const MedicalRates = require("../../Models/medical_rates");
const transporter = require("../../Utils/mailService");
module.exports = {
  getMedicalQuote: (req, res) => {
    const medicalPlanId = req.body.medicalPlanId;
    const principalAge = req.body.principalAge;
    const numberOfChildren = req.body.numberOfChildren;
    const spouseAge = req.body.spouseAge
    MedicalRates.findAll({
      where: {
        MedicalPlanId: medicalPlanId
      }
    })
      .then(rates => {
        var quoteObjectsArray = [];
        rates.map(rate => {
          var principalRate = 0;
          var spouseRate = 0;
          var childrenRate = 0;

          //calculate principal rate
          if (principalAge <= 40) {
            principalRate = principalRate + rate.principalInpatientAnnualYouth;
          } else if (principalAge <= 60) {
            principalRate =
              principalRate + rate.principalInpatientAnnualMiddleAge;
          } else if (principalAge <= 65) {
            principalRate = principalRate + rate.principalInpatientAnnualSenior;
          } else {
            console.log("too old mate");
          }

          //calculate spouse rate
          if (spouseAge <= 40) {
            spouseRate = spouseRate + rate.spouseInpatientAnnualYouth;
          } else if (spouseAge <= 60) {
            spouseRate =
            spouseRate + rate.spouseInpatientAnnualMiddleAge;
          } else if (spouseAge <= 65) {
            spouseRate = spouseRate + rate.principalInpatientAnnualSenior;
          } else {
            console.log("too old mate");
          }
          //calculate children rate
          childrenRate = rate.childrenInpatientAnnual * numberOfChildren
          
          var quoteObject = {
            principalRate: principalRate,
            spouseRate: spouseRate,
            childrenRate: childrenRate,
            medicalPlan: rate.MedicalPlanId,
            underwriter: rate.UnderwriterId
          };
          quoteObjectsArray.push(quoteObject);
        });
        res.send(quoteObjectsArray);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
};
