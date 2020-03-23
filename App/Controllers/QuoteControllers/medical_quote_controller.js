//@ts-check

const MedicalRates = require("../../Models/medical_rates");
const Transporter = require("../../Utils/mailService");
const UnderwriterModel = require("../../Models/underwriters");
const invoiceTemplates = require("./../../email_templates/invoicetemplate")
module.exports = {
  getMedicalQuote: (req, res) => {
    const medicalPlanId = req.body.medicalPlanId;
    const principalAge = req.body.principalAge;
    const numberOfChildren = req.body.numberOfChildren;
    const spouseAge = req.body.spouseAge;
    const outpatientPerPerson = req.body.outpatientPerPerson;
    MedicalRates.findAll({
      include: [UnderwriterModel],
      where: {
        MedicalPlanId: medicalPlanId
      }
    })
      .then(rates => {
        console.log(rates);
        var quoteObjectsArray = [];
        rates.map(rate => {
          var principalRate = 0;
          var principalRateOutpatient = 0;
          var spouseRate = 0;
          var spouseRateOutpatient = 0;
          var childrenRate = 0;
          var childrenRateOutpatient = 0;

          //calculate principal rate
          if (principalAge <= 40) {
            principalRate = principalRate + rate.principalInpatientAnnualYouth;
            if (outpatientPerPerson) {
              principalRateOutpatient =  rate.principalOutpatientAnnualYouth;
            }
          } else if (principalAge <= 60) {
            principalRate =
              principalRate + rate.principalInpatientAnnualMiddleAge;
              if (outpatientPerPerson) {
                principalRateOutpatient =  rate.principalOutpatientAnnualMiddleAge;
              }
          } else if (principalAge <= 65) {
            principalRate = principalRate + rate.principalInpatientAnnualSenior;
            if (outpatientPerPerson) {
              principalRateOutpatient =  rate.principalOutpatientAnnualSenior;
            }
          } else {
            console.log("too old mate");
          }

          //calculate spouse rate
          if (!(req.body.spouseAge === "")) {
            if (spouseAge <= 40) {
              spouseRate = spouseRate + rate.spouseInpatientAnnualYouth;
              if (outpatientPerPerson) {
                spouseRateOutpatient =   rate.spouseOutpatientAnnualYouth;
              }
            } else if (spouseAge <= 60) {
              spouseRate = spouseRate + rate.spouseInpatientAnnualMiddleAge;
              if (outpatientPerPerson) {
                spouseRateOutpatient =   rate.spouseOutpatientAnnualMiddleAge;
              }
            } else if (spouseAge <= 65) {
              spouseRate = spouseRate + rate.principalInpatientAnnualSenior;
              if (outpatientPerPerson) {
                spouseRateOutpatient =  rate.spouseOutpatientAnnualSenior;
              }
            } else {
              console.log("too old mate");
            }
          }

          //calculate children rate
          childrenRate = rate.childrenInpatientAnnual * numberOfChildren;
          if (outpatientPerPerson) {
            childrenRateOutpatient = rate.childrenOutpatientAnnual * numberOfChildren;
          }
          var quoteTotal = principalRate + principalRateOutpatient + spouseRate + spouseRateOutpatient + childrenRate + childrenRateOutpatient;
          var levies = quoteTotal * (0.45/100)
          var stampDuty = 40
          quoteTotal = quoteTotal + levies + stampDuty
          var quoteObject = {
            principalRate: principalRate,
            principalRateOutpatient: principalRateOutpatient,
            spouseRate: spouseRate,
            spouseRateOutpatient:spouseRateOutpatient,
            childrenRate: childrenRate,
            childrenRateOutpatient:childrenRateOutpatient,
            quoteTotal: quoteTotal,
            levies:levies,
            stampDuty: stampDuty,
            medicalPlan: rate.MedicalPlanId,
            underwriter: rate.Underwriter
          };
          quoteObjectsArray.push(quoteObject);
        });
        res.status(200).send(quoteObjectsArray);
        var mailOptions = {
          from: process.env.senderEmailAdress,
          to: req.user.email,
          subject: "Medical Insurance Quote",
          html: invoiceTemplates.invoiceQuoteEmail(req)
        }
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
        console.log(err);
        res.status(500).send(err);
      });
  }
};
