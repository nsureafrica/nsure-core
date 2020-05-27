//@ts-check

const MedicalRates = require("../../Models/medical_rates");
const Transporter = require("../../Utils/mailService");
const UnderwriterModel = require("../../Models/underwriters");
const invoiceTemplates = require("./../../email_templates/invoicetemplate");
const MedicalPlanModel = require("./../../Models/medical_plans");
const medicalQuotePdf = require("../../email_templates/medical_quote_pdf")
module.exports = {
  getMedicalQuote: (req, res) => {
    const medicalPlanId = req.body.medicalPlanId;
    const principalAge = req.body.principalAge;
    const numberOfChildren = req.body.numberOfChildren;
    const spouseAge = req.body.spouseAge;
    const outpatientPerPerson = req.body.outPatientPerPerson;
    MedicalRates.findAll({
      include: [UnderwriterModel],
      where: {
        MedicalPlanId: medicalPlanId
      }
    })
      .then(async rates => {
        var quoteObjectsArray = [];
        rates.map(rate => {
          console.log(rate)
          var principalRate = 0;
          var principalRateOutpatient = 0;
          var spouseRate = 0;
          var spouseRateOutpatient = 0;
          var childrenRate = 0;
          var childrenRateOutpatient = 0;

          //calculate principal rate
          if (principalAge <= 40) {
            principalRate = Math.ceil(principalRate + rate.principalInpatientAnnualYouth);
            if (outpatientPerPerson) {
              principalRateOutpatient = Math.ceil(rate.principalOutpatientAnnualYouth);
            }
          } else if (principalAge <= 60) {
            principalRate =
              principalRate + Math.ceil(rate.principalInpatientAnnualMiddleAge);
            if (outpatientPerPerson) {
              principalRateOutpatient = Math.ceil(rate.principalOutpatientAnnualMiddleAge);
            }
          } else if (principalAge <= 65) {
            principalRate = principalRate + Math.ceil(rate.principalInpatientAnnualSenior);
            if (outpatientPerPerson) {
              principalRateOutpatient = Math.ceil(rate.principalOutpatientAnnualSenior);
            }
          } else {
            console.error("too old mate");
            throw "too old mate"
          }

          //calculate spouse rate
          if (!(req.body.spouseAge === "")) {
            if (spouseAge <= 40) {
              spouseRate = spouseRate + Math.ceil(rate.spouseInpatientAnnualYouth);
              if (outpatientPerPerson) {
                spouseRateOutpatient = Math.ceil(rate.spouseOutpatientAnnualYouth);
              }
            } else if (spouseAge <= 60) {
              spouseRate = spouseRate + Math.ceil(rate.spouseInpatientAnnualMiddleAge);
              if (outpatientPerPerson) {
                spouseRateOutpatient = Math.ceil(rate.spouseOutpatientAnnualMiddleAge);
              }
            } else if (spouseAge <= 65) {
              spouseRate = spouseRate + Math.ceil(rate.principalInpatientAnnualSenior);
              if (outpatientPerPerson) {
                spouseRateOutpatient = Math.ceil(rate.spouseOutpatientAnnualSenior);
              }
            } else {
              console.error("too old mate");
              throw "too old mate"
            }
          }

          //calculate children rate
          childrenRate = Math.ceil(rate.childrenInpatientAnnual * numberOfChildren);
          if (outpatientPerPerson) {
            childrenRateOutpatient =
            Math.ceil(rate.childrenOutpatientAnnual * numberOfChildren);
          }
          var quoteTotal =
            principalRate +
            principalRateOutpatient +
            spouseRate +
            spouseRateOutpatient +
            childrenRate +
            childrenRateOutpatient;
          var levies = Math.ceil(quoteTotal * (0.45 / 100));
          var stampDuty = 40;
          quoteTotal = quoteTotal + levies + stampDuty;
          var quoteObject = {
            principalRate: principalRate,
            principalRateOutpatient: principalRateOutpatient,
            spouseRate: spouseRate,
            spouseRateOutpatient: spouseRateOutpatient,
            childrenRate: childrenRate,
            childrenRateOutpatient: childrenRateOutpatient,
            quoteTotal: quoteTotal,
            levies: levies,
            stampDuty: stampDuty,
            medicalPlan: rate.MedicalPlanId,
            underwriter: rate.Underwriter
          };
          quoteObjectsArray.push(quoteObject);
        });
        res.status(200).send(quoteObjectsArray);

        var rate = quoteObjectsArray[0];
        const medicalPlan = await MedicalPlanModel.findOne({
          where: { id: rate.medicalPlan }
        });
        const planDetails = { planDetails: medicalPlan.dataValues };
        const userDetails = { user: req.user };

        Object.assign(rate, planDetails);
        Object.assign(rate, userDetails);
        console.log(rate)
        const policyPdfDirectory = "./documentsStorage/PolicyPdf/"+ Date.now()+".pdf";
        await medicalQuotePdf.createInvoice(rate, policyPdfDirectory);
        var mailOptions = {
          from: process.env.senderEmailAdress,
          to: req.user.email,
          bcc: `${process.env.spireReceivingEmailAddress2},${process.env.businessTeamEmail}`,
          subject: "Medical Insurance Quote",
          html: invoiceTemplates.invoiceQuoteEmail(req),
          attachments: [{   // file on disk as an attachment
            filename: 'medicalquote.pdf',
            path: policyPdfDirectory // stream this file
        },]
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
        console.log(err);
        res.status(500).send(err);
      });
  }
};
