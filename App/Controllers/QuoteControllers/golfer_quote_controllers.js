//@ts-check
const GolferRatesModel = require("../../Models/golfers_policy_rates");
const GolfersPlansModel = require("../../Models/golfers_policy_plans")
const Transporter = require("../../Utils/mailService");
const UnderwriterModel = require("../../Models/underwriters");
const invoiceTemplates = require("./../../email_templates/invoicetemplate");
const golfersPdf = require("./../../email_templates/golfers_quote_pdf")

module.exports = {
  getGolfersQuote: async (req, res) =>  {
    try {
      const GolfersRate = await GolferRatesModel.findOne({
        include: [UnderwriterModel],
        where: {"GolfersPlanId":req.body.GolfersPlanId},
      });

      //levies , total ,stampduty annualPremium and Total Amount Owed
      const levies = Math.ceil(GolfersRate.levies * GolfersRate.annualPremium);
      var quoteTotal =
        levies + GolfersRate.stampDuty + GolfersRate.annualPremium;
      var quoteObject = {
        annualPremium: GolfersRate.annualPremium,
        stampDuty: GolfersRate.stampDuty,
        levies: levies,
        quoteTotal: quoteTotal,
        golfersPlan: GolfersRate.GolfersPlanId,
        underwriter: GolfersRate.Underwriter,
      };
      res.status(200).send(quoteObject);
      //send a mail

      const golfersPlan = await GolfersPlansModel.findOne({
        where: { id: req.body.GolfersPlanId },
      });
      const planDetails = { planDetails: golfersPlan.dataValues };
      const userDetails = { user: req.user };

      Object.assign(quoteObject, planDetails);
      Object.assign(quoteObject, userDetails);
      const policyPdfDirectory =
        "./documentsStorage/PolicyPdf/" + Date.now() + ".pdf";
      await golfersPdf.createInvoice(quoteObject, policyPdfDirectory);
      var mailOptions = {
        from: process.env.senderEmailAdress,
        to: req.user.email,
        bcc: `${process.env.spireReceivingEmailAddress2},${process.env.businessTeamEmail}`,
        subject: "Golfer Insurance Quote",
        html: invoiceTemplates.invoiceQuoteEmail(req),
        attachments: [
          {
            // file on disk as an attachment
            filename: "golferInsuaranceQuote.pdf",
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
      console.log(error)
      res.status(500).send(error);
    }
  },
};
