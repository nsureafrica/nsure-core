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

        annualPremiumNuclearFamily = rate.annualPremiumNuclearFamily * noOfNuclearFamily
        annualPremiumExtraChild = rate.annualPremiumPerExtraChild * noOfChildren
        annualPremiumParents = rate.annualPremiumPerParent * noOfParents
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
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
};
