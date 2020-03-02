//@ts-check

//@ts-ignore
const MedicalRates = require("../../Models/medical_rates");
const Transporter = require("../../Utils/mailService");
module.exports = {
  getMedicalQuote: (req, res) => {
    const medicalPlanId = req.body.medicalPlanId;
    const principalAge = req.body.principalAge;
    const numberOfChildren = req.body.numberOfChildren;
    const spouseAge = req.body.spouseAge
    MedicalRates.findOne({
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
        res.status(200).send(quoteObjectsArray);
        var mailOptions = {
          from: process.env.mailFrom,
          to: "allanmageto@yopmail.com",
          subject: "Motor Insurance Quote",
          html: `<b>Dear Customer,</b><br/><p>Your quote breakdown is as follows</p><p><b>Selected Options:</b></p>${JSON.stringify(
            req.body
          )}<p><b>Quote</b></p>${JSON.stringify(quoteObjectsArray)}`
        };
        Transporter.transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            //TODO save all failed mails to a certain table to be able to run a cron job hourly that resends all the mails
            console.log(err);
          } else {
            const notice = `Email sent: ` + info.response;
            console.log(notice);
          }
        });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
};
