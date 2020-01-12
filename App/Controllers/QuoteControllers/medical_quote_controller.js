//@ts-check

//@ts-ignore
const MedicalRates = require("../../Rates/medical_rates.json");
const transporter = require("../../Utils/mailService");

module.exports = {
  getMedicalQuote: (req, res) => {
    var quote = [];
    for (let i = 0; i < MedicalRates.rates.length; i++) {
      const rates = MedicalRates.rates[i];
      var quoteObj = {
        companyName: MedicalRates.rates[i].companyName,
        amount: 0
      };
    //TODO convert everything to small letters
      switch (req.body.typeOfCover) {
        case "royal":
          console.log("Royal");
          // quoteObj.amount = rates.motorcycles.comprehensive;
          break;
        case "premier":
          break;
        case "executive":
          break;
        case "advanced":
          break;
        case "classic":
          break;
        default:
          //the system cannot recognize the type of cover
          res.status(500).send("The selected type of cover is invalid");
          break;
      }
    }
    var mailOptions = {
        from: "technical@nsureafrica.com",
        to: `${req.body.email}, nyaranam@gmail.com`,
        subject: "Medical Insurance Quote",
        html: `<b>Dear Customer,</b><br/><p>Your quote breakdown is as follows</p><p><b>Selected Options:</b></p>${JSON.stringify(
          req.body
        )}<p><b>Quote</b></p>${JSON.stringify(quote)}`
      };
      transporter.transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          //TODO save all failed mails to a certain table to be able to run a cron job hourly that resends all the mails
          console.log(err);
        } else {
          const notice = `Email sent: ` + info.response;
          console.log(notice);
        }
      });
  }
  
};
