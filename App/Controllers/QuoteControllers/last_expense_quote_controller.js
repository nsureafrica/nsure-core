//@ts-check
// last expense rates
// send mail

// eiii do the math
//but for now just have a constant so that tony can test
const LastExpenseRates = require("../../Models/last_expense_rates");
const Transporter = require("../../Utils/mailService");
const UnderwriterModel = require("../../Models/underwriters");
const invoiceTemplates = require("./../../email_templates/invoicetemplate");
const lastExpensePlanModel = require("./../../Models/last_expense_plans");
const lastexpensepdf = require("./../../email_templates/last_expense_pdf");

module.exports = {
  getLastExpenseQuote: (req, res) => {
    const lastExpensePlanId = req.body.lastExpensePlanId;
    const noOfNuclearFamily = req.body.noOfNuclearFamily;
    const noOfChildren = req.body.noOfChildren;
    const noOfParents = req.body.noOfParents;

    LastExpenseRates.findOne({
      include: [UnderwriterModel],
      where: { lastExpensePlanId: lastExpensePlanId }
    })
      .then(async rate => {
        var annualPremiumNuclearFamily = 0;
        var annualPremiumExtraChild = 0;
        var annualPremiumParents = 0;

        annualPremiumNuclearFamily = Math.ceil(rate.annualPremiumNuclearFamily);
        if (noOfChildren > 4) {
          annualPremiumExtraChild =
          Math.ceil(rate.annualPremiumPerExtraChild * (noOfChildren - 4));
        }
        if (!(noOfNuclearFamily == 0)) {
          annualPremiumParents = Math.ceil(rate.annualPremiumPerParent * noOfParents);
        }
        var quoteTotal =
          annualPremiumNuclearFamily +
          annualPremiumExtraChild +
          annualPremiumParents;
        var quoteObject = {
          annualPremiumNuclearFamily: annualPremiumNuclearFamily,
          annualPremiumExtraChild: annualPremiumExtraChild,
          annualPremiumParents: annualPremiumParents,
          quoteTotal: quoteTotal,
          lastExpensePlan: rate.lastExpensePlanId,
          underwriter: rate.Underwriter
        };
        res.status(200).send(quoteObject);
        const lastExpensePlan = await lastExpensePlanModel.findOne({
          where: { id: lastExpensePlanId }
        });
        const planDetails = { planDetails: lastExpensePlan.dataValues };
        const userDetails = { user: req.user };

        Object.assign(quoteObject, planDetails);
        Object.assign(quoteObject,userDetails)
        const policyPdfDirectory = "./documentsStorage/PolicyPdf/"+ Date.now()+".pdf";
        await lastexpensepdf.createInvoice(quoteObject, policyPdfDirectory);
        var mailOptions = {
          from: process.env.senderEmailAdress,
          to: req.user.email,
          bcc: process.env.spireReceivingEmailAddress2,
          subject: "Last Expense Insurance Quote",
          html: invoiceTemplates.invoiceQuoteEmail(req),
          attachments: [{   // file on disk as an attachment
            filename: 'lastexpensequote.pdf',
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
        console.log(err)
        res.status(500).send(err);
      });
  }
};
