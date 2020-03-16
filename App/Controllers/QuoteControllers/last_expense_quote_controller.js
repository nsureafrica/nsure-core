//@ts-check
// last expense rates
// send mail

// eiii do the math
//but for now just have a constant so that tony can test
const LastExpenseRates = require("../../Models/last_expense_rates");
const Transporter = require("../../Utils/mailService");

module.exports = {
    getLastExpenseQuote: (req, res) => {

        const lastExpensePlanId = req.body.medicalPlanId;
        const principalAge = req.body.principalAge;
        const numberOfChildren = req.body.numberOfChildren;
        const spouseAge = req.body.spouseAge

        LastExpenseRates.findOne({ where: { id: 'My Title' } })
        res.status(200)
    }

}