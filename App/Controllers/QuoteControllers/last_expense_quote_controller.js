//@ts-check
// last expense rates
// send mail

// eiii do the math
//but for now just have a constant so that tony can test
const LastExpenseRates = require("../../Models/last_expense_rates");
const Transporter = require("../../Utils/mailService");
const UnderwriterModel = require("../../Models/underwriters");

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
      .then(rate => {
        var annualPremiumNuclearFamily = 0;
        var annualPremiumExtraChild = 0;
        var annualPremiumParents = 0;

        annualPremiumNuclearFamily = rate.annualPremiumNuclearFamily
        if (noOfChildren>4) {
          annualPremiumExtraChild = rate.annualPremiumPerExtraChild * noOfChildren - 4
        }
        if (!(noOfNuclearFamily == 0)) {
          annualPremiumParents = rate.annualPremiumPerParent * noOfParents
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
        var mailOptions = {
          from: process.env.senderEmailAdress,
          to: req.user.email,
          subject: "Last Expense Insurance Quote",
          html: `<b>Dear Customer,</b><br/><p>Your quote breakdown is as follows</p><p><b>Selected Options:</b></p>${JSON.stringify(
            req.body
          )}<p><b>Quote</b></p>${JSON.stringify(quoteObject)}`
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
