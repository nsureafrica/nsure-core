//@ts-check
const IncomeProtectionRates = require("../../Controllers/IncomeProtectionControllers/income_protection_rates_controllers");
const IncomeProtectionPlans = require("../../Controllers/IncomeProtectionControllers/income_protection_plan_controllers")
const Transporter = require("../../Utils/mailService");
const UnderwriterModel = require("../../Models/underwriters");
const invoiceTemplates = require("./../../email_templates/invoicetemplate");
const incomeProtectionPdf = require("./../../email_templates/income_protection_pdf")

module.exports = {
  getQuote: async (req, res) =>  {
    try {
      const IncomeProtectionRate = await IncomeProtectionRates.findOne({
        include: [UnderwriterModel],
        where: req.body.IncomeProtectionPlanId,
      });

      //levies , total ,stampduty annualPremium and Total Amount Owed
      
      var quoteObject = {
        quoteTotal: IncomeProtectionRate.annualPremium,
        incomeProtectionPlan: IncomeProtectionRate.IncomeProtectionPlanId,
        underwriter: IncomeProtectionRate.Underwriter,
      };
      res.status(200).send(quoteObject);
      //send a mail

      const plan = await IncomeProtectionPlans.findOne({
        where: { id: req.body.IncomeProtectionPlanId },
      });
      const planDetails = { planDetails: plan.dataValues };
      const userDetails = { user: req.user };

      Object.assign(quoteObject, planDetails);
      Object.assign(quoteObject, userDetails);
      const policyPdfDirectory =
        "./documentsStorage/PolicyPdf/" + Date.now() + ".pdf";
      await incomeProtectionPdf.createInvoice(quoteObject, policyPdfDirectory);
      var mailOptions = {
        from: process.env.senderEmailAdress,
        to: req.user.email,
        bcc: `${process.env.spireReceivingEmailAddress2},${process.env.businessTeamEmail}`,
        subject: "Income Protection Plan Insurance Quote",
        html: invoiceTemplates.invoiceQuoteEmail(req),
        attachments: [
          {
            // file on disk as an attachment
            filename: "incomeProtectionPlanQuote.pdf",
            path: policyPdfDirectory, // stream this file
          },
        ],
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
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
